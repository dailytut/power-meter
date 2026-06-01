const { updateUserInfo } = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function updateUser(req, res) {
  const {
    user: { id },
  } = req;

  try {
    const user = await updateUserInfo({ ...req.body, id });
    if (user.email) {
      req.session.messages = { success: UPDATE_INFO_SUCCESS_MESSAGE };
      req.session.userInfo = { ...user };
      return res.redirect('/profile');
    }
  } catch (error) {
    // fall through to error redirect
  }

  req.session.messages = { errors: { databaseError: UPDATE_INFO_ERROR_MESSAGE } };
  return res.redirect('/profile');
}

module.exports = updateUser;

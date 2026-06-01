const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');
const { getUserById } = require('../repository');

async function redirectToDashboard(req, res) {
  try {
    const userInfo = await getUserById(req.user && req.user.id);
    req.session.userInfo = { ...userInfo };
    return res.redirect('/');
  } catch (err) {
    const messages = { errors: { databaseError: FETCH_INFO_ERROR_MESSAGE } };
    return res.status(500).render('pages/login', { messages });
  }
}

module.exports = redirectToDashboard;

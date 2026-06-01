const registerRepo = require('../repository');

async function createUser(req, res) {
  try {
    const user = await registerRepo.createUser(req.body);
    if (user.email) {
      req.session.messages = { success: 'You have successfully registered, you can now log in.' };
      return res.redirect('/login');
    }
  } catch (error) {
    const databaseError =
      error.code === '23505' ? 'The email has already been taken.' : 'Something went wrong.';
    req.session.messages = { errors: { databaseError } };
    return res.redirect('/register');
  }

  req.session.messages = { errors: { databaseError: 'Something went wrong.' } };
  return res.redirect('/register');
}

module.exports = createUser;

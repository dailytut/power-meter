const requestBodyValidation = require('./commands/verify-request-body');
const updateUserInfo = require('./commands/update-user-info');
const loadPage = require('./commands/load-page');

module.exports = (router, middlewares = []) => {
  router.get('/profile', ...middlewares, loadPage);
  router.post('/update-profile-info', requestBodyValidation, updateUserInfo);
  return router;
};

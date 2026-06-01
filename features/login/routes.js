const verifyRequestBody = require('./commands/verify-request-body');
const login = require('./commands/login');
const redirectToDashboard = require('./commands/redirect-to-dashboard');
const loadPage = require('./commands/load-page');

module.exports = (router) => {
  router.post('/login', verifyRequestBody, login, redirectToDashboard);
  router.get('/login', loadPage);
  return router;
};

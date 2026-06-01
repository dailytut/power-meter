const requestBodyValidation = require('./commands/verify-request-body');
const createUser = require('./commands/create-user');
const loadPage = require('./commands/load-page');

module.exports = (router) => {
  router.get('/register', loadPage);
  router.post('/register', requestBodyValidation, createUser);
  return router;
};

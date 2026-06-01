const { logout } = require('./commands/logout');

module.exports = (router, middlewares = []) => {
  router.post('/logout', ...middlewares, logout);
  return router;
};

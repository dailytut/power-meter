function logout(req, res) {
  req.logout((err) => {
    if (err) {
      return res.status(500).redirect('/');
    }
    req.session.destroy(() => {
      res.clearCookie(process.env.SESSION_COOKIE_NAME);
      return res.redirect('/login');
    });
  });
}

module.exports = {
  logout,
};

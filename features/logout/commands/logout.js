function logout(req, res) {
  req.logout((logoutErr) => {
    req.session.destroy(() => {
      res.clearCookie(process.env.SESSION_COOKIE_NAME);
      if (logoutErr) {
        return res.status(500).redirect('/');
      }
      return res.redirect('/login');
    });
  });
}

module.exports = {
  logout,
};

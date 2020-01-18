const express = require('express');

const router = express.Router();

const mountRegisterRoutes = require('../features/register/routes');
const mountLoginRoutes = require('../features/login/routes');
const mountLogoutRoutes = require('../features/logout/routes');
const mountResetPasswordRoutes = require('../features/reset-password/routes');
const mountProfileRoutes = require('../features/profile/routes');

function isAuthenticated(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

/* GET home page. */
router.get('/', isAuthenticated, (req, res) => {
  res.render('pages/dashboard');
});
router.get('/profile', isAuthenticated, (req, res) => {
  res.render('pages/profile');
});
router.get('/Power-consumption', isAuthenticated, (req, res) => {
  res.render('CorporateBuilding/Power-consumption');
});
router.get('/Load-hour', isAuthenticated, (req, res) => {
  res.render('CorporateBuilding/Load-hour');
});
router.get('/powerconsumption', isAuthenticated, (req, res) => {
  res.render('SuperMarkets/powerconsumption');
});
router.get('/loadhour', isAuthenticated, (req, res) => {
  res.render('SuperMarkets/loadhour');
});

router.get('/AMPS-R-Y-B', isAuthenticated, (req, res) => {
  res.render('Industry/AMPS-R-Y-B');
});
router.get('/Frquencey', isAuthenticated, (req, res) => {
  res.render('Industry/Frquencey');
});
router.get('/Harmonic', isAuthenticated, (req, res) => {
  res.render('Industry/Harmonic');
});
router.get('/Killo-wat-hour', isAuthenticated, (req, res) => {
  res.render('Industry/Killo-wat-hour');
});
router.get('/Load-hour-runninghour', isAuthenticated, (req, res) => {
  res.render('Industry/Load-hour-runninghour');
});

router.get('/Maximum-demand', isAuthenticated, (req, res) => {
  res.render('Industry/Maximum-demand');
});
router.get('/Voltage-R-Y-B', isAuthenticated, (req, res) => {
  res.render('Industry/Voltage-R-Y-B');
});
router.get('/Daily-report', isAuthenticated, (req, res) => {
  res.render('Report/Daily-report');
});
router.get('/Monthlyreport', isAuthenticated, (req, res) => {
  res.render('Report/Monthlyreport');
});
router.get('/Weeklyreport', isAuthenticated, (req, res) => {
  res.render('Report/Weeklyreport');
});



mountRegisterRoutes(router);
mountLoginRoutes(router);
mountLogoutRoutes(router, [isAuthenticated]);
mountResetPasswordRoutes(router);
mountProfileRoutes(router, [isAuthenticated]);

module.exports = router;

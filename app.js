require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});

const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const initAuthMiddleware = require('./features/login/init-auth-middleware');
const indexRouter = require('./routes/index');

const redisStoreConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

if (process.env.REDIS_URL) {
  redisStoreConfig.url = process.env.REDIS_URL;
}

if (process.env.REDIS_PASSWORD) {
  redisStoreConfig.password = process.env.REDIS_PASSWORD;
}

const redisStore = new RedisStore(redisStoreConfig);

const staticFolder = process.env.NODE_ENV === 'development' ? 'public' : 'dist';
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, staticFolder)));

const { COOKIE_EXPIRATION_MS, SESSION_SECRET } = process.env;
const maxAge = parseInt(COOKIE_EXPIRATION_MS, 10);

app.use(
  session({
    store: redisStore,
    secret: SESSION_SECRET,
    name: process.env.SESSION_COOKIE_NAME,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge,
    },
  })
);

initAuthMiddleware(app);

app.use((req, res, next) => {
  if (req.session) {
    res.locals.messages = req.session.messages;
    res.locals.userInfo = req.session.userInfo;
    req.session.messages = {};
  }
  next();
});

app.use('/', indexRouter);

app.use((req, res) => {
  res.status(404).render('pages/404');
});

module.exports = app;

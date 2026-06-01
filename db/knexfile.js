require('dotenv').config({
  path: `../env-files/${process.env.NODE_ENV || 'development'}.env`,
});

const connection = process.env.DATABASE_URL || {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
};

const baseConfig = {
  client: 'pg',
  connection,
  pool: { min: 2, max: 10 },
  migrations: {
    directory: './migrations',
    tableName: 'migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

module.exports = {
  development: { ...baseConfig },
  staging: { ...baseConfig },
  production: { ...baseConfig },
  test: { ...baseConfig },
};

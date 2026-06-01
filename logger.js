const pino = require('pino');

const transport =
  process.env.NODE_ENV === 'development'
    ? { target: 'pino-pretty' }
    : undefined;

const logger = pino({ transport });
module.exports = logger;

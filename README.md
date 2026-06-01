# Power Meter

Energy monitoring dashboard for tracking power consumption across corporate buildings, supermarkets, and industrial facilities.

## Features

- User authentication (login, register, reset password, profile)
- Corporate building monitoring (power consumption, load hours)
- Supermarket monitoring (power consumption, load hours)
- Industrial monitoring (amps, frequency, harmonics, kWh, voltage, max demand, load/running hours)
- Reports (daily, weekly, monthly)

## Tech Stack

- **Server:** Express.js, EJS templates
- **Auth:** Passport.js (local strategy), bcrypt, Redis sessions
- **Database:** PostgreSQL via Knex
- **Build:** Gulp (SCSS, minification, BrowserSync)
- **Process:** PM2

## Setup

```bash
# Install dependencies
npm install

# Copy env file and configure
cp env-files/development.env.example env-files/development.env

# Run database migrations
npm run knex migrate:latest

# Seed default user
npm run knex seed:run

# Start development server
npm run dev
```

## Environment

Requires PostgreSQL and Redis running locally. See `env-files/development.env.example` for configuration.

Default seed user: `admin@argon.com` / `secret`

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start dev server with BrowserSync |
| `npm run monitor` | PM2 monitoring dashboard |
| `npm run knex` | Run Knex CLI commands |

## License

MIT

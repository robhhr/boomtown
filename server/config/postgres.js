const { Pool } = require("pg");

module.exports = app => {
  return new Pool({
    port: app.get("PORT"),
    host: app.get("PG_HOST"),
    user: app.get("PG_USER"),
    password: app.get("PG_PASSWORD"),
    db: app.get("PG_DB"),
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 2000
  });
};

const { Pool } = require("pg");
const config = require("./config/config");

const poolSettings = {
    max: 10,
    idleTimeout: 30000,
    connectionTimeoutMillis: 5000,
}

const dbConnection = config.db.connectionString
    ? {
        connectionString: config.db.connectionString
    }
    : {
        user: config.db.user,
        host: config.db.host,
        database: config.db.database,
        password: config.db.password,
        port: config.db.port,
        ssl: config.db.ssl,
    };

const pool = new Pool({
    ...dbConnection,
    ...poolSettings,
});

module.exports = pool;
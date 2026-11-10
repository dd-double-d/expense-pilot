require("dotenv").config();

const requiredEnvVariables = process.env.DATABASE_URL ?
["DATABASE_URL"] : [
    "DB_USER",
    "DB_HOST",
    "DB_NAME",
    "DB_PASSWORD",
    "DB_PORT",
];

for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        throw new Error(`Missing required environment variable: ${variable}`);
    }
}

const config = {
    db: {
        connectionString: process.env.DATABASE_URL,
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: process.env.NODE_ENV === "production",
    },
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
    corsOrigin: process.env.FRONTEND_URL || "http://localhost:5173"
};

module.exports = config;
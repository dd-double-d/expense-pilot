const express = require("express");
const cors = require("cors");
const pool = require("./db");
const expenseRoutes = require("./routes/expenseRoutes");
const errorHandler = require("./middleware/errorHandler");
const config = require("./config/config");

const app = express();

app.use(cors({
    origin: config.corsOrigin
}));
app.use(express.json());

app.use("/expenses", expenseRoutes);

app.get('/api/db-health', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            message: 'Database connected successfully.',
            time: result.rows[0].now
        });
    } catch (error) {
        next(error);
    }
});

app.get('/api/health', async (req, res, next) => {
    try {
        await pool.query('SELECT 1'); // Check database connection

        res.json({
            "status": "ok",
            "environment": config.env,
            "database": "connected"
    });
    } catch (error) {
        next(error);
    }
});

app.use(errorHandler);

const server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

const shutdown = async (signal) => {
    console.log(`${signal} received. Shutting down gracefully...`);

    server.close(async () => {
        await pool.end();
        console.log("Server and database connection closed.");
        process.exit(0);
    });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
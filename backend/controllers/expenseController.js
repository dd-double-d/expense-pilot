const pool = require("../db");

// Get all expenses
const getExpenses = async (req, res, next) => {
    try {
        const result = await pool.query(
            'SELECT * FROM expenses ORDER BY id'
        );
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

// Create a new expense
const createExpense = async (req, res, next) => {
    const { title, amount, category } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO expenses (title, amount, category)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [title, amount, category]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// Delete an expense by ID
const deleteExpense = async (req, res, next) => {
    const id = Number(req.params.id);

    try {
        const result = await pool.query(
            `DELETE FROM expenses
            WHERE id = $1
            RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Expense not found."
            });
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

// Update an expense by ID
const updateExpense = async (req, res, next) => {
    const { title, amount, category } = req.body;
    const id = Number(req.params.id);

    try {
        const result = await pool.query(
            `UPDATE expenses
             SET title = $1, amount = $2, category = $3
             WHERE id = $4
             RETURNING *`,
            [title, amount, category, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Expense not found."
            });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getExpenses,
    createExpense,
    deleteExpense,
    updateExpense,
};
const express = require("express");
const router = express.Router();

const {
    getExpenses,
    createExpense,
    deleteExpense,
    updateExpense,
} = require("../controllers/expenseController");
const { validateExpense } = require("../middleware/validateExpenses");
const { validateId } = require("../middleware/validateId");

router.get("/", getExpenses);

router.post("/", validateExpense, createExpense);

router.delete("/:id", validateId, deleteExpense);

router.put("/:id", validateId, validateExpense, updateExpense);

module.exports = router;
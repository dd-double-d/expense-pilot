const validateExpense = (req, res, next) => {
    const { title, amount, category } = req.body;
    // The ?. operator means: "Only call the method if the value isn't null or undefined."
    if (!title?.trim() ||
        amount === undefined ||
        amount === null ||
        !category?.trim()
    ) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    if (typeof amount !== "number") {
            return res.status(400).json({
                message: "Amount must be a number."
            });
        }

    if (isNaN(amount)) {
        return res.status(400).json({
            message: "Amount must be a valid number."
        });
    }

    if (amount <= 0) {
        return res.status(400).json({
            message: "Amount must be greater than zero."
        });
    }

    if (amount > 99999999.99) {
        return res.status(400).json({
            message: "Amount must not exceed 99,999,999.99."
        });
    }

    if (title.length > 255) {
        return res.status(400).json({
            message: "Title must not exceed 255 characters."
        });
    }

    if (category.length > 100) {
        return res.status(400).json({
            message: "Category must not exceed 100 characters."
        });
    }

    next();
};

module.exports = {
    validateExpense
};
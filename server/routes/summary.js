const express = require("express");
const router = express.Router();

const db = require("../database/db");

router.get("/", (req, res) => {

    db.all(
        "SELECT * FROM expenses",
        [],
        (err, expenses) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            const totalSpent =
                expenses.reduce(
                    (sum, expense) =>
                        sum +
                        expense.amount,
                    0
                );

            const highestExpense =
                expenses.length > 0
                    ? Math.max(
                          ...expenses.map(
                              expense =>
                                  expense.amount
                          )
                      )
                    : 0;

            const perCategory = {};

            expenses.forEach(expense => {
                perCategory[
                    expense.category
                ] =
                    (perCategory[
                        expense.category
                    ] || 0) +
                    expense.amount;
            });

            res.json({
                totalSpent,
                highestExpense,
                perCategory
            });

        }
    );

});

module.exports = router;
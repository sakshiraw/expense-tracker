const express = require("express");
const router = express.Router();

const db = require("../database/db");

// Get all expenses
router.get("/", (req, res) => {
    db.all(
        "SELECT * FROM expenses ORDER BY date DESC",
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(rows);
        }
    );
});

// Add expense
router.post("/", (req, res) => {
    const { amount, category, date, note } = req.body;

    if (
        !amount ||
        !category ||
        !date ||
        amount <= 0
    ) {
        return res.status(400).json({
            error:
                "Amount, category and date are required"
        });
    }

    db.run(
        `
        INSERT INTO expenses
        (amount, category, date, note)
        VALUES (?, ?, ?, ?)
        `,
        [
            amount,
            category,
            date,
            note || ""
        ],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                message:
                    "Expense added successfully",
                id: this.lastID
            });
        }
    );
});

// Update expense
router.put("/:id", (req, res) => {
    const { amount, category, date, note } =
        req.body;

    const id = req.params.id;

    db.run(
        `
        UPDATE expenses
        SET amount = ?,
            category = ?,
            date = ?,
            note = ?
        WHERE id = ?
        `,
        [
            amount,
            category,
            date,
            note || "",
            id
        ],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error:
                        "Expense not found"
                });
            }

            res.json({
                message:
                    "Expense updated successfully"
            });
        }
    );
});

// Delete expense
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    db.run(
        "DELETE FROM expenses WHERE id = ?",
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error:
                        "Expense not found"
                });
            }

            res.json({
                message:
                    "Expense deleted successfully"
            });
        }
    );
});

module.exports = router;
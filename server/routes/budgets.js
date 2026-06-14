const express = require("express");
const router = express.Router();

const db = require("../database/db");

router.get("/", (req, res) => {

    db.all(
        "SELECT * FROM budgets",
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

router.post("/", (req, res) => {

    const { category, amount } =
        req.body;

    db.run(
        `
        INSERT OR REPLACE INTO budgets
        (category, amount)
        VALUES (?, ?)
        `,
        [category, amount],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                message:
                    "Budget saved"
            });

        }
    );

});

module.exports = router;
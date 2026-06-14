const express = require("express");
const router = express.Router();

const db = require("../database/db");

const {
    createObjectCsvWriter
} = require("csv-writer");

router.get("/", (req, res) => {

    db.all(
        "SELECT * FROM expenses",
        [],
        async (err, rows) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            const csvWriter =
                createObjectCsvWriter({
                    path: "expenses.csv",
                    header: [
                        {
                            id: "id",
                            title: "ID"
                        },
                        {
                            id: "amount",
                            title: "AMOUNT"
                        },
                        {
                            id: "category",
                            title: "CATEGORY"
                        },
                        {
                            id: "date",
                            title: "DATE"
                        },
                        {
                            id: "note",
                            title: "NOTE"
                        }
                    ]
                });

            await csvWriter.writeRecords(
                rows
            );

            res.download(
                "expenses.csv"
            );

        }
    );

});

module.exports = router;
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
    "./database/expenses.db",
    (err) => {
        if (err) {
            console.error(
                "Database error:",
                err.message
            );
        } else {
            console.log(
                "Connected to SQLite database"
            );
        }
    }
);

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            date TEXT NOT NULL,
            note TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS budgets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT UNIQUE NOT NULL,
            amount REAL NOT NULL
        )
    `);

});

module.exports = db;
require("./database/db");

const express = require("express");
const cors = require("cors");

const expenseRoutes = require("./routes/expenses");
const summaryRoutes = require("./routes/summary");
const budgetRoutes = require("./routes/budgets");
const exportRoutes = require("./routes/export");

const app = express();

app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
    res.json({
        message: "Expense Tracker API is running"
    });
});

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use("/api/expenses", expenseRoutes);

app.use("/api/summary", summaryRoutes);

app.use("/api/budgets", budgetRoutes);

app.use("/api/export", exportRoutes);

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        error: "Something went wrong"
    });
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
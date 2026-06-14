import { useEffect, useState } from "react";
import axios from "axios";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

const API_URL =
  "https://expense-tracker-api-f73a.onrender.com/api";

function App() {

    const [expenses, setExpenses] = useState([]);

    const [formData, setFormData] = useState({
        amount: "",
        category: "Food",
        date: "",
        note: ""
    });

    const [editingId, setEditingId] = useState(null);

    const [filterCategory, setFilterCategory] =
        useState("All");

    const [startDate, setStartDate] =
        useState("");

    const [endDate, setEndDate] =
        useState("");

    const [budgets, setBudgets] =
        useState([]);

    useEffect(() => {
        fetchExpenses();
        fetchBudgets();
    }, []);

    async function fetchExpenses() {
        try {
            const response =
                await axios.get(
                    `${API_URL}/expenses`
                );

            setExpenses(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    async function fetchBudgets() {
        try {

            const response =
                await axios.get(
                    `${API_URL}/budgets`
                );

            setBudgets(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            if (editingId) {

                await axios.put(
                    `${API_URL}/expenses/${editingId}`,
                    {
                        amount: Number(
                            formData.amount
                        ),
                        category:
                            formData.category,
                        date: formData.date,
                        note: formData.note
                    }
                );

            } else {

                await axios.post(
                    `${API_URL}/expenses`,
                    {
                        amount: Number(
                            formData.amount
                        ),
                        category:
                            formData.category,
                        date: formData.date,
                        note: formData.note
                    }
                );
            }

            resetForm();

            fetchExpenses();

        } catch (error) {
            console.error(error);
        }
    }

    function resetForm() {

        setEditingId(null);

        setFormData({
            amount: "",
            category: "Food",
            date: "",
            note: ""
        });
    }

    function editExpense(expense) {

        setEditingId(expense.id);

        setFormData({
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            note: expense.note
        });
    }

    async function deleteExpense(id) {

        try {

            await axios.delete(
                `${API_URL}/expenses/${id}`
            );

            fetchExpenses();

            if (editingId === id) {
                resetForm();
            }

        } catch (error) {
            console.error(error);
        }
    }

    const filteredExpenses =
        expenses.filter(expense => {

            const categoryMatch =
                filterCategory === "All" ||
                expense.category ===
                filterCategory;

            const startMatch =
                !startDate ||
                expense.date >= startDate;

            const endMatch =
                !endDate ||
                expense.date <= endDate;

            return (
                categoryMatch &&
                startMatch &&
                endMatch
            );
        });

    const totalSpent =
        filteredExpenses.reduce(
            (sum, expense) =>
                sum + expense.amount,
            0
        );

    const highestExpense =
        filteredExpenses.length > 0
            ? Math.max(
                ...filteredExpenses.map(
                    expense =>
                        expense.amount
                )
            )
            : 0;

    const chartData =
        Object.entries(

            filteredExpenses.reduce(
                (acc, expense) => {

                    acc[
                        expense.category
                    ] =
                        (
                            acc[
                            expense.category
                            ] || 0
                        ) +
                        expense.amount;

                    return acc;

                },
                {}
            )

        ).map(
            ([name, value]) => ({
                name,
                value
            })
        );

    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#8884D8"
    ];

 return (
    <div
        style={{
            padding: "30px",
            fontFamily: "Arial"
        }}
    >
        <h1>💰 Expense Tracker</h1>

        <div
            style={{
                display: "flex",
                gap: "20px",
                marginBottom: "30px",
                flexWrap: "wrap"
            }}
        >
            <Card
                title="Total Spent"
                value={`₹${totalSpent}`}
            />

            <Card
                title="Highest Expense"
                value={`₹${highestExpense}`}
            />

            <Card
                title="Transactions"
                value={filteredExpenses.length}
            />
        </div>

        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "20px"
            }}
        >
            <input
                type="number"
                required
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        amount: e.target.value
                    })
                }
            />

            <select
                value={formData.category}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        category: e.target.value
                    })
                }
            >
                <option>Food</option>
                <option>Transport</option>
                <option>Bills</option>
                <option>Entertainment</option>
                <option>Other</option>
            </select>

            <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        date: e.target.value
                    })
                }
            />

            <input
                type="text"
                placeholder="Note"
                value={formData.note}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        note: e.target.value
                    })
                }
            />

            <button type="submit">
                {editingId
                    ? "Update Expense"
                    : "Add Expense"}
            </button>

            {editingId && (
                <button
                    type="button"
                    onClick={resetForm}
                >
                    Cancel
                </button>
            )}
        </form>

        <div
            style={{
                marginBottom: "20px"
            }}
        >
            <strong>
                Category:
            </strong>

            <select
                value={filterCategory}
                onChange={(e) =>
                    setFilterCategory(
                        e.target.value
                    )
                }
                style={{
                    marginLeft: "10px"
                }}
            >
                <option>All</option>
                <option>Food</option>
                <option>Transport</option>
                <option>Bills</option>
                <option>Entertainment</option>
                <option>Other</option>
            </select>

            <strong
                style={{
                    marginLeft: "20px"
                }}
            >
                Date:
            </strong>

            <input
                type="date"
                value={startDate}
                onChange={(e) =>
                    setStartDate(
                        e.target.value
                    )
                }
                style={{
                    marginLeft: "10px"
                }}
            />

            <input
                type="date"
                value={endDate}
                onChange={(e) =>
                    setEndDate(
                        e.target.value
                    )
                }
                style={{
                    marginLeft: "10px"
                }}
            />
        </div>

        <h2>Budgets</h2>

        <ul>
            {budgets.map((budget) => (
                <li key={budget.id}>
                    {budget.category}: ₹
                    {budget.amount}
                </li>
            ))}
        </ul>

        <table
            border="1"
            cellPadding="10"
            style={{
                borderCollapse: "collapse",
                width: "100%",
                marginTop: "20px"
            }}
        >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Note</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {filteredExpenses.map(
                    (expense) => (
                        <tr
                            key={expense.id}
                        >
                            <td>
                                {expense.id}
                            </td>

                            <td>
                                {
                                    expense.category
                                }
                            </td>

                            <td>
                                ₹
                                {
                                    expense.amount
                                }
                            </td>

                            <td>
                                {expense.date}
                            </td>

                            <td>
                                {expense.note}
                            </td>

                            <td>
                                <button
                                    onClick={() =>
                                        editExpense(
                                            expense
                                        )
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        deleteExpense(
                                            expense.id
                                        )
                                    }
                                    style={{
                                        marginLeft:
                                            "10px"
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>

        <h2
            style={{
                marginTop: "40px"
            }}
        >
            Expense Breakdown
        </h2>

        <PieChart
            width={400}
            height={300}
        >
            <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
            >
                {chartData.map(
                    (
                        entry,
                        index
                    ) => (
                        <Cell
                            key={index}
                            fill={
                                COLORS[
                                index %
                                COLORS.length
                                ]
                            }
                        />
                    )
                )}
            </Pie>

            <Tooltip />

            <Legend />
        </PieChart>
<footer
  style={{
    textAlign: "center",
    marginTop: "40px",
    padding: "20px",
    color: "#666",
    fontSize: "14px",
    borderTop: "1px solid #ddd"
  }}
>
  Built by <strong>Sakshi</strong> • React • Express • SQLite
</footer>
    </div>
);
}

function Card({
    title,
    value
}) {
    return (
        <div
            style={{
                border:
                    "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                minWidth: "180px",
                boxShadow:
                    "0 2px 8px rgba(0,0,0,0.1)"
            }}
        >
            <h3>{title}</h3>

            <p
                style={{
                    fontSize: "24px",
                    fontWeight:
                        "bold"
                }}
            >
                {value}
            </p>


        </div>
    );
}

export default App;
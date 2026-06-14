# 💰 Expense Tracker

## Overview

This project is a full-stack Expense Tracker built using React, Node.js, Express, and SQLite.

The goal of the application is to help users keep track of their daily expenses, organize spending by category, and get a quick overview of where their money is going.

Users can add, edit, delete, and filter expenses. The application also provides useful insights such as total spending, highest expense, category-wise spending breakdown, budget tracking, and visual charts.

This project was built as part of the Studio Graphene Full Stack Developer assessment.

---

## Features

### Expense Management

* Add a new expense
* Edit existing expenses
* Delete expenses
* Store amount, category, date, and note

### Filtering

* Filter expenses by category
* Filter expenses by date range

### Dashboard

* Total amount spent
* Highest expense recorded
* Total number of transactions

### Analytics

* Category-wise expense breakdown
* Pie chart visualization using Recharts

### Budget Tracking

* Create budgets for categories
* View budget allocations

### Data Persistence

* SQLite database for persistent storage

### Export

* Export expenses as CSV

---

## Tech Stack

### Frontend

* React
* Vite
* Axios
* Recharts

### Backend

* Node.js
* Express.js

### Database

* SQLite

---

## Project Structure

```text
expense-tracker
│
├── client
│   ├── public
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── database
│   ├── routes
│   ├── tests
│   ├── utils
│   ├── package.json
│   └── index.js
│
└── README.md
```

---

## Running the Project Locally

### Prerequisites

* Node.js installed
* Git installed

---

### Clone Repository

```bash
git clone <repository-url>
cd expense-tracker
```

---

### Start Backend

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

### Start Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

### Expenses

#### Get All Expenses

```http
GET /api/expenses
```

#### Create Expense

```http
POST /api/expenses
```

Request Body:

```json
{
  "amount": 250,
  "category": "Food",
  "date": "2026-06-14",
  "note": "Lunch"
}
```

---

#### Update Expense

```http
PUT /api/expenses/:id
```

---

#### Delete Expense

```http
DELETE /api/expenses/:id
```

---

### Summary

```http
GET /api/summary
```

Returns:

* Total spending
* Highest expense
* Category-wise spending

---

### Budgets

```http
GET /api/budgets
POST /api/budgets
```

---

### Export

```http
GET /api/export
```

Downloads expense data as CSV.

---

## Screenshots

You can add screenshots of:

* Dashboard
* Expense Form
* Expense Table
* Pie Chart
* Budget Section

---

## Future Improvements

Given more time, I would like to:

* Improve the overall UI design
* Add authentication and user accounts
* Support recurring expenses
* Add monthly and yearly reports
* Add dark mode
* Improve mobile responsiveness

---

## What I Learned

While building this project, I gained hands-on experience with:

* Building REST APIs using Express
* Working with SQLite databases
* Connecting React applications with backend APIs
* Managing application state with React Hooks
* Creating charts and dashboards
* Structuring a full-stack application

---

## Author

Sakshi Rawat

Built as part of the Studio Graphene Full Stack Developer Assessment.

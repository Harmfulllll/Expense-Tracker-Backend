# Expense-Tracker-Backend

This is the backend for an expense tracker application. It is built with Node.js, Express, and MongoDB.

## Table of Contents

- [Features](#features)
- [Prerequisites](#Prerequisites)
- [Installation](#installation)

** ## Features **

### User Authentication and Authorization

Users can register and log in to the application. Passwords are hashed and stored securely using bcrypt. JSON Web Tokens (JWT) are used for maintaining user sessions and authorizing routes.

### CRUD Operations for Expenses

Users can create, read, update, and delete their expenses. Each expense includes details such as the amount, category etc.

### CRUD Operations for Incomes

Users can create, read, update, and delete their incomes. Each income includes details such as the amount, category etc.

### Expense Reports Generation

Users can generate reports of their expenses. The report includes total expenses, expenses by category, and a breakdown of recurring and non-recurring expenses.

### Budget maintain/Email Notifications

Users receive email notifications when their expenses exceed a certain budget. The application send emails to that user.

### Security

The application uses various security measures such as HTTPS, input sanitization, JWT for authentication, CORS, Helmet for setting HTTP headers, and a Content Security Policy.

## Getting Started

### Prerequisites

- Node.js
- Express.js
- MongoDB

### Installation

1. Clone the repository

`git clone https://github.com/Harmfulllll/Expense-Tracker-Backend.git `

2.Install NPM packages
`npm install`

3.Create a .env file in the root directory and add the following:
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
EMAIL=<your-email>

4.Start the server

Contact
Tanvir Hassan Joy - [Github](https://github.com/Harmfulllll)

-- Dummy database schema and sample data for PostgreSQL

-- Table structure for `users`
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table structure for `expenses`
CREATE TABLE expenses (
    expense_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    merchant VARCHAR(100),
    transaction_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(10) NOT NULL CHECK (source IN ('manual', 'sms'))
);

-- Sample users
INSERT INTO users (username, email) VALUES
  ('testuser', 'test@example.com'),
  ('alice', 'alice@example.com'),
  ('bob', 'bob@example.com');

-- Sample expenses
INSERT INTO expenses (user_id, amount, category, merchant, transaction_date, source) VALUES
  (1, 25.50, 'Food', 'McDonalds', '2025-09-01 12:30:00+00', 'manual'),
  (1, 100.00, 'Shopping', 'Amazon', '2025-09-02 15:00:00+00', 'sms'),
  (2, 15.75, 'Transport', 'Uber', '2025-09-03 09:45:00+00', 'manual'),
  (3, 60.00, 'Groceries', 'Walmart', '2025-09-04 18:20:00+00', 'sms');

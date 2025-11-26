import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Note: This is a reference file for the Backend requirement.
// The frontend runs in a mocked environment in this preview.

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database Connection
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'shopee_db'
};

const pool = mysql.createPool(dbConfig);

// Routes

// Get All Products
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Register User
app.post('/api/users/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        res.status(201).json({ message: 'User registered', userId: (result as any).insertId });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Create Order
app.post('/api/orders', async (req, res) => {
    const { userId, cartItems, totalAmount, paymentMethod } = req.body;
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();

        const [orderResult] = await connection.query(
            'INSERT INTO orders (user_id, total_amount, payment_status, payment_method) VALUES (?, ?, ?, ?)',
            [userId, totalAmount, 'completed', paymentMethod]
        );
        const orderId = (orderResult as any).insertId;

        for (const item of cartItems) {
            await connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)',
                [orderId, item.id, item.quantity, item.price]
            );
        }

        await connection.commit();
        res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: (err as Error).message });
    } finally {
        connection.release();
    }
});

// Contact Form
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await pool.query(
            'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        );
        res.json({ message: 'Message sent' });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
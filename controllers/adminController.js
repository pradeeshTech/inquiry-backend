const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const db = require('../config/db');
const db = require('../db'); 

// Admin login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch the admin details from the database
    const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const admin = rows[0];

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET || 'default_secret_key', // Make sure this is properly set
      { expiresIn: '1h' }
    );

    // Send the response with the token
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get users for admin panel
exports.getUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email FROM users');
    res.json({ data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Middleware to authenticate JWT
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

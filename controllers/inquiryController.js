// controllers/inquiryController.js

const db = require('../db');  // Import the database connection

// Controller function to get all inquiries (GET request)
const getInquiries = async (req, res) => {
  try {
    const { month, year } = req.body; // Get month and year from POST body
    console.log('Month:', month, 'Year:', year);

    // Construct the base SQL query
    let query = 'SELECT * FROM inquiries';
    let queryParams = [];

    // Add month and year filtering if provided
    if (month && year) {
      query += ' WHERE MONTH(submittedAt) = ? AND YEAR(submittedAt) = ?';
      queryParams.push(month, year);
    } else if (month) {
      query += ' WHERE MONTH(submittedAt) = ?';
      queryParams.push(month);
    } else if (year) {
      query += ' WHERE YEAR(submittedAt) = ?';
      queryParams.push(year);
    }

    query += ' ORDER BY submittedAt DESC'; // Add ordering

    // Log the query and parameters
    console.log('Executing Query:', query);
    console.log('Query Parameters:', queryParams);

    // Execute the query
    const [rows] = await db.execute(query, queryParams);

    res.json({ message: 'Successfully fetched data', data: rows || [], status: 'success' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Failed to retrieve inquiries' });
  }
};



// Controller function to create a new inquiry (POST request)
const createInquiry = async (req, res) => {
  const { name, email, phone, projectType, additionalNotes } = req.body;

  // Basic validation (ensure all fields are provided)
  if (!name || !email || !phone || !projectType) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Insert the inquiry into the database
    const [result] = await db.execute(
      'INSERT INTO inquiries (name, email, phone, projectType, additionalNotes) VALUES (?, ?, ?, ?, ?)', 
      [name, email, phone, projectType, additionalNotes]
    );

    // Send the newly created inquiry as a response
    const newInquiry = { 
      id: result.insertId, 
      name, 
      email, 
      phone, 
      projectType, 
      additionalNotes, 
      submittedAt: new Date().toISOString()
    };

    res.status(200).json({ message: 'successfully created' ,status:'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create inquiry' });
  }
};

module.exports = { getInquiries, createInquiry };

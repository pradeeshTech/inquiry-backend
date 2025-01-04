const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');

// Route to get all inquiries (GET)
router.post('/', inquiryController.getInquiries);

// Route to create a new inquiry (POST)
router.post('/createInquiry', inquiryController.createInquiry);

module.exports = router;

// routes/invoiceRoutes.js

const express = require('express');
const { storeInvoice } = require('../controllers/invoiceController'); // Import the controller function
const { getAllInvoices } = require('../controllers/invoiceController');
const { getTodayTotalIncome } = require('../controllers/invoiceController');


const router = express.Router();

// POST route to store invoice data
router.post('/makeinvoice', storeInvoice);
router.get('/getallinvoice', getAllInvoices);
router.get('/todayincome',getTodayTotalIncome)


module.exports = router;

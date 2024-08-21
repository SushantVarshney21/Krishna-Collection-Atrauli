// controllers/invoiceController.js

const Invoice = require('../models/Invoice'); // Import the Invoice model

const storeInvoice = async (req, res) => {
  try {
    const {
      organizationName,
      invoiceNumber,
      date,
      time,
      customerName,
      customerPhone,
      items,
      totalAmount,
    } = req.body;

    // Create a new Invoice instance
    const newInvoice = new Invoice({
      organizationName,
      invoiceNumber,
      date,
      time,
      customerName,
      customerPhone,
      items,
      totalAmount,
    });

    // Save the invoice to the database
    const savedInvoice = await newInvoice.save();

    // Send a success response
    res.status(201).json({
      message: 'Invoice stored successfully',
      invoice: savedInvoice,
    });
  } catch (error) {
    console.error('Error storing invoice:', error);
    res.status(500).json({
      message: 'Failed to store invoice',
      error: error.message,
    });
  }
};

const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    console.error('Error fetching invoices:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getTodayTotalIncome = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    // Decode the URL-encoded date string
    const decodedDate = decodeURIComponent(date);

    // Parse the incoming date in dd/mm/yyyy format
    const [day, month, year] = decodedDate.split('/');
    const parsedDate = new Date(year, month - 1, day); // Create Date object

    // Format the date to dd/mm/yyyy
    const formattedDate = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;

    // Find invoices where the date matches exactly (no time involved)
    const invoices = await Invoice.find({
      date: formattedDate, // Ensure this matches your MongoDB stored date format
    });

    // Calculate the total income by summing the totalAmount field of each invoice
    const totalIncome = invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);

    res.json({ totalIncome });
  } catch (err) {
    console.error('Error calculating total income by date:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  storeInvoice,
  getAllInvoices,
  getTodayTotalIncome,
};

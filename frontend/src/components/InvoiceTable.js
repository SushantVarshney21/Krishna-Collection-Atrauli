import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
  
    if (storedEmail !== process.env.REACT_APP_EMAIL) {
      nav("/login");
    }
  }, [nav]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/invoices/getallinvoice`);
        setInvoices(response.data);
      } catch (err) {
        console.error('Error fetching invoices:', err);
      } finally {
        setLoading(false); // Stop loading regardless of whether invoices are fetched or not
      }
    };

    fetchInvoices();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Display loading text or a spinner
  }

  return (
    <div>
      <h2>All Invoices</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Invoice No.</th>
            <th>Customer Name</th>
            <th>Customer Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? (
            invoices.map((invoice, index) => (
              <tr key={invoice._id}>
                <td>{index + 1}</td>
                <td>{invoice.customerName}</td>
                <td>{invoice.customerPhone}</td>
                <td>{invoice.date}</td>
                <td>{invoice.time}</td>
                <td>{invoice.totalAmount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No invoices found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);

  const nav = useNavigate()
  useEffect(()=>{
    const storedEmail = localStorage.getItem("userEmail");
  
    // Check if the stored email matches the predefined email
    if (storedEmail !== process.env.REACT_APP_EMAIL) {
      nav("/login"); // Redirect to login page if not authenticated
    }
  },[])

  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER_URL)
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/invoices/getallinvoice`)
        setInvoices(response.data);
      } catch (err) {
        console.error('Error fetching invoices:', err);
      }
    };

    fetchInvoices();
  }, []);

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
          {invoices.map((invoice, index) => (
            <tr key={invoice._id}>
              <td>{index + 1}</td>
              <td>{invoice.customerName}</td>
              <td>{invoice.customerPhone}</td>
              <td>{new Date(invoice.date).toLocaleDateString()}</td>
              <td>{new Date(invoice.date).toLocaleTimeString()}</td>
              <td>{invoice.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
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
      }
    };

    fetchInvoices();
  }, []);

  const convertToAmPm = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    const period = hours < 12 ? 'AM' : 'PM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;
  };

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
              <td>{invoice.date}</td>
              <td>{convertToAmPm(invoice.time)}</td> {/* Convert time to AM/PM format */}
              <td>{invoice.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;

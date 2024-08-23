import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/print.css';

const Print = () => {
  const { inputData } = useParams();
  const [output, setOutput] = useState([]);
  const [total, setTotal] = useState(0);
  const [customerName, setCustomerName] = useState('XYZ');
  const [customerPhone, setCustomerPhone] = useState('0000000000');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state for store invoice button
  const organizationName = "Krishna Collection Atrauli";

  const nav = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
  
    if (storedEmail !== process.env.REACT_APP_EMAIL) {
      nav("/login");
    }
  }, [nav]);

  const formatDateToDDMMYYYY = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const currentDate = formatDateToDDMMYYYY(new Date());
  const currentTime = new Date().toLocaleTimeString();
  const invoiceNumber = Math.floor(100000 + Math.random() * 900000);

  useEffect(() => {
    if (inputData) {
      showInput();
    }
  }, [inputData]);

  function showInput() {
    const arr = inputData.split("+");
    let totalSum = 0;
    const outputData = arr.map((data, index) => {
      const arr2 = data.split("*");
      const itemTotal = arr2[0] * arr2[1];
      totalSum += itemTotal;
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{arr2[0]}</td>
          <td>{arr2[1]}</td>
          <td>{itemTotal}</td>
        </tr>
      );
    });

    setOutput(outputData);
    setTotal(totalSum);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  const handleStoreInvoice = async () => {
    setLoading(true); // Set loading to true when storing invoice begins

    const invoiceData = {
      organizationName,
      date: currentDate,
      time: currentTime,
      invoiceNumber,
      customerName,
      customerPhone,
      items: output.map((_, index) => ({
        itemNumber: index + 1,
        quantity: inputData.split("+")[index].split("*")[0],
        price: inputData.split("+")[index].split("*")[1],
        total: inputData.split("+")[index].split("*")[0] * inputData.split("+")[index].split("*")[1],
      })),
      totalAmount: total,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/invoices/makeinvoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });

      if (!response.ok) {
        throw new Error('Failed to store invoice details');
      }

      const result = await response.json();
      console.log('Invoice stored successfully:', result);
      alert('Invoice stored successfully!');
    } catch (error) {
      console.error('Error storing invoice details:', error);
      alert('Error storing invoice details');
    } finally {
      setLoading(false); // Set loading to false after storing invoice completes
    }
  };

  return (
    <div className="invoice-container">
      {!submitted ? (
        <form className="customer-form" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name">Customer Name:</label>
            <input
              type="text"
              id="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{ textAlign: 'left' }}
            />
          </div>
          <div>
            <label htmlFor="phone">Customer Phone Number:</label>
            <input
              type="tel"
              maxLength="10"
              pattern="\d{10}"
              title="Please enter exactly 10 digits"
              id="phone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              style={{ textAlign: 'left' }}
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      ) : (
        <>
          <h1 className="invoice-title">{organizationName}</h1>
          <div className="invoice-details">
            <p><strong>Date:</strong> {currentDate}</p>
            <p><strong>Time:</strong> {currentTime}</p>
            <p><strong>Invoice No:</strong> {invoiceNumber}</p>
          </div>
          <div className="customer-info">
            <p><strong>Name:</strong> {customerName}</p>
            <p><strong>Phone Number:</strong> {customerPhone}</p>
          </div>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {output}
            </tbody>
          </table>
          <h2 className="invoice-total">Grand Total: {total}</h2>
          <button className="print-button" onClick={window.print}>Print Invoice</button>
          <button className="store-button" onClick={handleStoreInvoice} disabled={loading}>
            {loading ? 'Storing Invoice...' : 'Store Invoice'}
          </button>
        </>
      )}
    </div>
  );
}

export default Print;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TodayIncome = () => {
  const [date, setDate] = useState('');
  const [totalIncome, setTotalIncome] = useState(null);
  const [error, setError] = useState('');

  const nav = useNavigate()
  useEffect(()=>{
    const storedEmail = localStorage.getItem("userEmail");
  
    // Check if the stored email matches the predefined email
    if (storedEmail !== process.env.REACT_APP_EMAIL) {
      nav("/login"); // Redirect to login page if not authenticated
    }
  },[])

  

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert the date to DD/MM/YYYY format
      const formattedDate = new Date(date);
      const day = String(formattedDate.getDate()).padStart(2, '0');
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based
      const year = formattedDate.getFullYear();
      const dateString = `${day}/${month}/${year}`;

      // Send the date to the backend
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/invoices/todayincome`, {
        params: { date: dateString },
      });

      setTotalIncome(response.data.totalIncome);
      setError('');
    } catch (err) {
      setError('Error fetching total income. Please try again.');
      setTotalIncome(null);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '100%', margin: 'auto' }}>
      <h2>Get Total Income for a Specific Date</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Date:
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            style={{ marginLeft: '10px', textAlign: 'left' }}
          />
        </label>
        <button type="submit" style={{ display: 'block', marginTop: '10px' }}>
          Get Income
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {totalIncome !== null && (
        <h3>Total Income for {date}: Rs. {totalIncome}</h3>
      )}
    </div>
  );
};

export default TodayIncome;

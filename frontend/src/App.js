// src/App.js
import React from 'react';
import Calculator from './components/Calculator';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Print from './components/Print';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import InvoiceTable from './components/InvoiceTable';
import TodayIncome from './components/TodayIncome';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Calculator/>
  },
  {
    path:"/print/:inputData",
    element:<Print/>
  },
  {
    path:"/allinvoice",
    element:<InvoiceTable/> 
  },
  {
    path:"/todayincome",
    element:<TodayIncome/>
  },
  {
    path:"/login",
    element:<Login/>
  },
])

function App() {
  return (
   <>
   <RouterProvider router={router}/>
   </>
  );
}

export default App;

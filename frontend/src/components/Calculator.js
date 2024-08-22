// src/Calculator.js

import React, { useEffect, useState } from 'react';
import '../css/calculate.css'; // Optional: For styling
import { Link , useNavigate} from 'react-router-dom';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const nav = useNavigate();
  
  useEffect(()=>{
    const storedEmail = localStorage.getItem("userEmail");
  
    // Check if the stored email matches the predefined email
    if (storedEmail !== process.env.REACT_APP_EMAIL) {
      nav("/login"); // Redirect to login page if not authenticated
    }
  },[])

  const handleClick = (e) => {
    setInput(input + e.target.name);
  };

  const clear = () => {
    setInput('');
    setResult('');
  };

  const backspace = () => {
    setInput(input.slice(0, -1));
  };

  const calculate = () => {
    try {
      setResult(eval(input).toString());
    } catch (error) {
      setResult('Error');
    }
  };
  const Logout = ()=>{
    if(localStorage.getItem('userEmail')){
      localStorage.removeItem("userEmail")
      nav('/login')
    }
  }

  return (
    <>
    <div style={{display:'flex' , alignItems:'center', justifyContent:'space-around'}}> 
    <Link to={`/allinvoice`} ><button style={{}}>All Invoice</button></Link>
    <Link to={`/todayincome`}><button>Today Income</button></Link>
    <button onClick={Logout} style={{width:'10%'}}>Logout</button>
    </div>
     <div className="calculator">
      <form>
        <input type="text" value={input} placeholder="0" readOnly />
        <input type="text" value={result} placeholder="Total" readOnly />
      </form>

      <div className="keypad">
        <button onClick={clear} id="clear">Clear</button>
        <button onClick={backspace} id="backspace">C</button>
        <button name="7" onClick={handleClick}>7</button>
        <button name="/" onClick={handleClick}>&divide;</button>
        <button name="8" onClick={handleClick}>8</button>
        <button name="9" onClick={handleClick}>9</button>
        <button name="4" onClick={handleClick}>4</button>
        <button name="*" onClick={handleClick}>&times;</button>
        <button name="5" onClick={handleClick}>5</button>
        <button name="6" onClick={handleClick}>6</button>
        <button name="1" onClick={handleClick}>1</button>
        <button name="-" onClick={handleClick}>&ndash;</button>
        <button name="2" onClick={handleClick}>2</button>
        <button name="3" onClick={handleClick}>3</button>
        <button name="0" onClick={handleClick}>0</button>
        <button name="+" onClick={handleClick}>+</button>
        {/* <button name="." onClick={handleClick}>.</button> */}
        <button onClick={calculate} id="result">Total</button>
      </div>
    </div>
      <Link to={`/print/${input}`}><button style={{backgroundColor:"green"}}>Submit</button></Link>
    </>
  );
}

export default Calculator;

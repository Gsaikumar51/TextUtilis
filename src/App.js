import './App.css';

import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import React, { useState } from 'react';
import Alert from './components/Alert';

import {
  BrowserRouter as Router,
  Routes, // Updated from Switch to Routes
  Route
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled", "success");
      document.title = 'textutils - Dark mode';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
      document.title = 'textutils - light mode';

    }
  }

  return (
    <>
      <Router>
      <Navbar title="TextUtils" aboutText="About Us" mode={mode} toggleMode={toggleMode} key={new Date()} /> {/* Add the aboutText prop here */}
        <Alert alert={alert} />
        <div className="container my-3">
          {/* /users --> component 1 */}
          {/* /users/home --> component 2 */}
          <Routes> {/* Updated to Routes */}
            <Route exact path="/about" element={<About mode={mode} />} /> {/* Updated to use element prop */}
            <Route exact path="/" element={
              <TextForm showAlert={showAlert} heading="Enter the text to Analyze Below" mode={mode} />} 
            /> {/* Updated to use element prop */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

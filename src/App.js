import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Window1 from './Components/Window1';
import Window2 from './Components/Window2'; 

function App() {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'grey';
      document.body.style.color = 'black';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }
  };

  return (
    <Router>
      <Navbar title="AI_Assisted_Typing_Master" mode={mode} toggleMode={toggleMode} />
      <Routes>
        <Route path="/" element={<Window1 />} />
        <Route path="/Window2" element={<Window2 />} />
      </Routes>
    </Router>
    
  );
}

export default App;

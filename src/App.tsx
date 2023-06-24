import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Components/Main';
import Landing from './Components/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<Main />}></Route>
        <Route path="/" element={<Landing />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

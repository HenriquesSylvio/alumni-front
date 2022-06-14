import './App.css';
import React from 'react';
import Home from './pages/home';
import Inscription from './pages/inscription';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route exact path='/inscription' element={<Inscription/>}/>
      </Routes>
    </BrowserRouter>
   
  );
};

export default App;
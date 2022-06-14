import './App.css';
import React from 'react';
import Home from './pages/home';
import Inscription from './pages/inscription';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

const App = () => {

  return (

    <BrowserRouter>
        <Layout>

              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route exact path='/inscription' element={<Inscription/>}/>
              </Routes>

        </Layout>
    </BrowserRouter>
   
  );
};

export default App;
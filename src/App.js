import './App.css';
import React, {useState} from 'react';
import Home from './pages/home';
import Inscription from './pages/inscription';
import Feed from './pages/Feed';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Auth from "./contexts/Auth";
import {hasAuthenticated} from "./services/AuthApi";
import {ToastContainer} from "react-toastify";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
    return (
      <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>
          <BrowserRouter>
              <Layout>
                  <Routes>
                      <Route path='/' element={<Home/>}/>
                      <Route exact path='/inscription' element={<Inscription/>}/>
                      <Route exact path='/feed' element={<Feed/>}/>
                  </Routes>
                  <ToastContainer />
              </Layout>

          </BrowserRouter>
      </Auth.Provider>
  );
};

export default App;
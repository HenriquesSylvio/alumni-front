import './App.css';
import React, {useState} from 'react';
import Home from './pages/home';
import Inscription from './pages/inscription';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import {BrowserRouter, Routes, Route, Switch} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Auth from "./contexts/Auth";
import {hasAuthenticated} from "./services/AuthApi";
import {ToastContainer} from "react-toastify";
import AuthenticatedRoute from "./contexts/AuthenticatedRoute";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
    document.body.style = 'background: #F2F2F2;';
    return (
      <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>
          <BrowserRouter>
              <Layout>
                  <Routes>
                      <Route path='/' element={<Home/>}/>
                      <Route exact path='/inscription' element={<Inscription/>}/>
                      <Route element={<AuthenticatedRoute/>}>
                          <Route exact path='/feed' element={<Feed/>}/>
                          <Route exact path='/profile' element={<Profile/>}/>
                      </Route>
                  </Routes>
                  <ToastContainer />
              </Layout>

          </BrowserRouter>
      </Auth.Provider>
  );
};

export default App;
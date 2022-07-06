import './App.css';
import React, {useState, Suspense, lazy} from 'react';
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
import OpenModalAddPost from "./contexts/OpenModalAddPost";
import OpenModalDiscussion from "./contexts/OpenModalDiscussion";

// const Profile = lazy(() => import('./pages/Profile'))
const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
    const [isOpenAddPost, setIsOpenAddPost] = useState(false);
    const [isOpenDiscussion, setIsOpenDiscussion] = useState(false);

    return (
      <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>
          <OpenModalAddPost.Provider value={{isOpenAddPost, setIsOpenAddPost}}>
              <OpenModalDiscussion.Provider value={{isOpenDiscussion, setIsOpenDiscussion}}>
                  <BrowserRouter>
                      <Layout>
                              <Routes>
                                  <Route path='/' element={<Home/>}/>
                                  <Route exact path='/inscription' element={<Inscription/>}/>
                                  <Route element={<AuthenticatedRoute/>}>
                                      <Route exact path='/feed' element={<Feed/>}/>
                                      <Route exact path='/profile/:id' element={<Profile/>}/>
                                      <Route exact path='/profile' element={<Profile/>}/>
                                  </Route>
                              </Routes>
                          <ToastContainer />
                      </Layout>
                  </BrowserRouter>
              </OpenModalDiscussion.Provider>
        </OpenModalAddPost.Provider>
      </Auth.Provider>
  );
};

export default App;
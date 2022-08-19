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
import OpenModalAddComment from "./contexts/OpenModalAddComment";
import ResponseIdPost from "./contexts/ResponseIdPost";
import ActiveConnectedUser from "./contexts/ActiveConnectedUser";
import Post from "./pages/Post";
import Event from "./pages/Event";
import Search from "./pages/Search";
import OpenModalSearch from "./contexts/OpenModalSearch";
import Messages from "./pages/Messages";
import SelectedConversationIndex from "./contexts/SelectedConversationIndex";
import MessageConversation from "./contexts/MessageConversation";
import OpenModalSendMessage from "./contexts/OpenModalSendMessage";
import FirstLoad from "./contexts/FirstLoad";
import Admin from "./contexts/Admin";
import AdminRoute from "./contexts/AdminRoute";
import AdminPanel from "./pages/AdminPanel";
import OpenModalAddFaculty from "./contexts/OpenModalAddFaculty";

// const Profile = lazy(() => import('./pages/Profile'))
const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
    const [isOpenAddPost, setIsOpenAddPost] = useState(false);
    const [isOpenAddComment, setIsOpenAddComment] = useState(false);
    const [idPost, setIdPost] = useState(0);
    const [activeProfile, setActiveProfile] = useState({})
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const [messageConversation, setMessageConversation] = useState({});
    const [isOpenSendMessage, setIsOpenSendMessage] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOpenAddFaculty, setIsAddFaculty] = useState(false);

    return (
      <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>
          <Admin.Provider value={{isAdmin, setIsAdmin}}>
              <FirstLoad.Provider value={{firstLoad, setFirstLoad}}>
                  <ActiveConnectedUser.Provider value={{activeProfile, setActiveProfile}}>
                      <OpenModalAddPost.Provider value={{isOpenAddPost, setIsOpenAddPost}}>
                          <OpenModalAddComment.Provider value={{isOpenAddComment, setIsOpenAddComment}}>
                              <OpenModalSearch.Provider value={{isOpenSearch, setIsOpenSearch}}>
                                      <ResponseIdPost.Provider value={{idPost, setIdPost}}>
                                          <SelectedConversationIndex.Provider value={{selectedConversationIndex, setSelectedConversationIndex}}>
                                              <MessageConversation.Provider value={{messageConversation, setMessageConversation}}>
                                                  <OpenModalSendMessage.Provider value={{isOpenSendMessage, setIsOpenSendMessage}}>
                                                      <OpenModalAddFaculty.Provider value={{isOpenAddFaculty, setIsAddFaculty}}>
                                                          <BrowserRouter>
                                                              <Layout>
                                                                  <Routes>
                                                                      <Route path='/' element={<Home/>}/>
                                                                      <Route exact path='/inscription' element={<Inscription/>}/>
                                                                      <Route element={<AuthenticatedRoute/>}>
                                                                          <Route exact path='/feed' element={<Feed/>}/>
                                                                          <Route exact path='/profile/:id' element={<Profile/>}/>
                                                                          <Route exact path='/post/:id' element={<Post/>}/>
                                                                          <Route exact path='/profile' element={<Profile/>}/>
                                                                          <Route exact path='/events' element={<Event/>}/>
                                                                          <Route exact path='/messages' element={<Messages/>}/>
                                                                          <Route exact path='/search/:typeSearch/:word' element={<Search/>}/>
                                                                          <Route element={<AdminRoute/>}>
                                                                              <Route exact path='/adminPanel' element={<AdminPanel/>}/>
                                                                          </Route>
                                                                      </Route>
                                                                  </Routes>
                                                                  <ToastContainer />
                                                              </Layout>
                                                          </BrowserRouter>
                                                      </OpenModalAddFaculty.Provider>
                                                  </OpenModalSendMessage.Provider>
                                              </MessageConversation.Provider>
                                          </SelectedConversationIndex.Provider>
                                      </ResponseIdPost.Provider>
                              </OpenModalSearch.Provider>
                          </OpenModalAddComment.Provider>
                    </OpenModalAddPost.Provider>
                  </ActiveConnectedUser.Provider>
              </FirstLoad.Provider>
          </Admin.Provider>
      </Auth.Provider>
  );
};

export default App;
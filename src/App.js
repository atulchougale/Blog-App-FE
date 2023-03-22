
import { useState } from 'react';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import DataProvider from './context/DataProvider';

//components

import Header from './componnents/header/Header';
import Home from './componnents/home/Home';
import CreatePost from './componnents/create/CreatePost';
import DetailView from './componnents/details/DetailsView';
import Update from './componnents/create/Update';
import About from './componnents/about/About';
import Contact from './componnents/contact/Contact';
import Login from './componnents/account/Login'
import Profile from './componnents/profile/profile';
import Footer from './componnents/Footer/footer';
import UserProfile from './componnents/profile/userProfile'

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ?
    <>
      <Header />
      <Outlet />
      <Footer/>
      
    </>
    : <Navigate replace to='/account' />
}



function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);


  return (
    <DataProvider>
      <BrowserRouter>
      
        <Box style={{ marginTop: 90 ,marginBottom:30 }}>
          <Routes>
            <Route path='/account' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create' element={<CreatePost />} />
            </Route>

            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>

            <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/contact' element={<Contact />} />
            </Route>

            <Route exact path='/profile' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route exact path='/profile' element={<Profile />} />
            </Route>

            <Route path='/profile/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/profile/:id' element={<UserProfile />} />
            </Route>

            {/* <Route path='/profile/:id' element={<UserProfile />} /> */}
          </Routes>
        </Box>
      <ToastContainer/>
      </BrowserRouter>
     
    </DataProvider>
    
  );
}

export default App;

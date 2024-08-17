
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import AuthPage from '../pages/Auth';
import Login from '../pages/Auth/login';
import Signup from '../pages/Auth/signup';

const AppRoutes = () => {
  return (
    <BrowserRouter>
    
    <Routes>
      {/* Authentication Routes */}
      <Route path='auth'>
        <Route path="" element={<AuthPage />} />
        <Route path="login" element={<Login />} />
        <Route path='signup' element={<Signup/>}/>
      </Route>

    <Route path='home'>
      <Route path="" element={<Home />} />
    </Route>
    
   </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
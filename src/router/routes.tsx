
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import AuthPage from '../pages/Auth';
import Login from '../pages/Auth/login';
import Signup from '../pages/Auth/signup';
import RootLayout from '../layout/HomeLayout';
import ProposalPage from '../pages/Proposal';
import BalancePage from '../pages/Balances/Index';
import PaymentPage from '../pages/Payments';

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

    <Route path='' element={<RootLayout/>}>
      <Route path="home" element={<Home />} />
      <Route path="proposals" element={<ProposalPage />} />
      <Route path="balance" element={<BalancePage />} />
      <Route path="payments" element={<PaymentPage />} />
    </Route>

   </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
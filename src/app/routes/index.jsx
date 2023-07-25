import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from 'containers/common/layout';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

// LAZY IMPORT
// LOGIN
const LoginPage = lazy(() => import('../../containers/LogIn'));
// FORGET PASSWORD
const ForgetPasswordPage = lazy(() => import('../../containers/ForgotPassword'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <PublicRoutes>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotpassword" element={<ForgetPasswordPage />} />
          <Route path="/resetpassword" element={<>resetpassword</>} />
        </Routes>
      </PublicRoutes>
      <PrivateRoutes>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<>dashboard</>} />
            <Route path="/pages/reports" element={<>Reports</>} />

            <Route path="/pages/accounting/items" element={<>items</>} />
            <Route path="/pages/accounting/banking" element={<>banking</>} />

            <Route path="/pages/accounting/sales/customers" element={<>customers</>} />
            <Route path="/pages/accounting/sales/accounts" element={<>accounts</>} />
          </Route>
        </Routes>
      </PrivateRoutes>
    </BrowserRouter>
  );
}

export default AppRoutes;

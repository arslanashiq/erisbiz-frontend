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
      <Routes>
        <Route path="/">
          <Route path="auth" element={<PublicRoutes />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgetPasswordPage />} />
            <Route path="reset-password" element={<>resetpassword</>} />
          </Route>

          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<>dashboard</>} />
              <Route path="/pages/reports" element={<>Reports</>} />

              <Route path="/pages/accounting/items" element={<>items</>} />
              <Route path="/pages/accounting/banking" element={<>banking</>} />

              <Route path="/pages/accounting/sales/customers" element={<>customers</>} />
              <Route path="/pages/accounting/sales/accounts" element={<>accounts</>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

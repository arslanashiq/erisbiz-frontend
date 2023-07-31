import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from 'containers/common/layout';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

// AUTH
const LoginPage = lazy(() => import('containers/auth/LogIn'));
const ForgetPasswordPage = lazy(() => import('containers/auth/ForgotPassword'));

// Private Routes
const DashboardPage = lazy(() => import('containers/dashboard'));
// Bank
const BankListing = lazy(() => import('containers/Accounting/Banking/Main'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          true && (
            <div className="load">
              <div className="load__icon-wrap">
                <svg className="load__icon">
                  <path fill="#e0c46cde" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                </svg>
              </div>
            </div>
          )
        }
      >
        <Routes>
          <Route path="/">
            <Route path="auth" element={<PublicRoutes />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="forgot-password" element={<ForgetPasswordPage />} />
              <Route path="reset-password" element={<>resetpassword</>} />
            </Route>

            <Route path="/" element={<PrivateRoutes />}>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/pages/reports" element={<>Reports</>} />

                <Route path="/pages/accounting/banking" element={<BankListing />} />
                <Route path="/pages/accounting/items" element={<>items</>} />

                <Route path="/pages/accounting/sales/customers" element={<>customers</>} />
                <Route path="/pages/accounting/sales/accounts" element={<>accounts</>} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Welcome to Luxury CRM FR02</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

// src/routes.js (Optional)
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Login';
import FormPage from './pages/FormPage';
import EditorPage from './pages/Dashboard';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/form" element={<FormPage />} />
    <Route path="/editor" element={<EditorPage />} />
  </Routes>
);

export default AppRoutes;

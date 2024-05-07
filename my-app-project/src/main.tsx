import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './react-router/AppRoutes.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <AppRoutes />
  </React.StrictMode>,
)
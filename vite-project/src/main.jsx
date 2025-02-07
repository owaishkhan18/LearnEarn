import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // import BrowserRouter
import './index.css';
import App from './App.jsx';

import { AuthProvider } from './components/AuthContext/AuthContext.jsx';
// Wrap App component with BrowserRouter
createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>  
  </BrowserRouter>
);



// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { AuthProvider } from "./AuthContext/AuthContext"; // Ensure correct path

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </React.StrictMode>
// );

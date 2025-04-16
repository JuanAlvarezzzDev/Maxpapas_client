import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from 'react-router-dom'
import { QuioscoProvider } from './context/QuioscoProvider'
import router from './router'
import './index.css'
import { AdminProvider } from './context/AdminProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QuioscoProvider>
        <AdminProvider>
        <RouterProvider router={router} />
        </AdminProvider>
      </QuioscoProvider>
      <ToastContainer />
  </React.StrictMode>,
)

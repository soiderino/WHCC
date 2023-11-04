import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      toastOptions={{
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff'
        }
      }}
    />
  </React.StrictMode>
)

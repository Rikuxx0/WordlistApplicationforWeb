// mounts the app to a DOM element
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
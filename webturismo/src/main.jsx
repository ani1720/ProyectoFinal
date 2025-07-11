import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import RouteGenerator from './AppApi.jsx'
const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <RouteGenerator/>
    </BrowserRouter>
  </React.StrictMode>
)

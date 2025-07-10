import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Ruta from './Ruta.jsx'
import RouteGenerator from './AppApi.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Ruta/>
    <RouteGenerator />
  </React.StrictMode>
)

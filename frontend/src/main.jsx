
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserAuthContextProvider } from './context/UserAuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  

<UserAuthContextProvider>
  <React.StrictMode>
    <App />

  </React.StrictMode>,
</UserAuthContextProvider>
)

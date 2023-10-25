import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserAuthContextProvider } from './context/UserAuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  


  <React.StrictMode>
<<<<<<< HEAD
    {/* <UserAuthContextProvider> */}
        <App />

    {/* </UserAuthContextProvider> */}
=======
    <UserAuthContextProvider>
        <App />

    </UserAuthContextProvider>
>>>>>>> 152094a6925bfefeee58fd0d23445f62b060af6e
  </React.StrictMode>,
)

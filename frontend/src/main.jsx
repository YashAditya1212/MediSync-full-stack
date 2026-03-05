import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider, { AppContext } from './context/AppContext.jsx'
import UserContextProvider from './context/UserContext.jsx'
import DarkModeProvider from './context/DarkModeContext.jsx'
import SmoothScroll from './components/UI/SmoothScroll.jsx';
import AdminContextProvider from './context/admin/AdminContext.jsx'
import DoctorContextProvider from './context/admin/DoctorContext.jsx'
import AdminAppContextProvider from './context/admin/AdminAppContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <AppContextProvider>
          <AppContext.Consumer>
            {({ backendUrl }) => (
              <AdminContextProvider>
                <AdminAppContextProvider>
                  <DoctorContextProvider>
                    <UserContextProvider backendUrl={backendUrl}>
                      <SmoothScroll>
                        <App />
                      </SmoothScroll>
                    </UserContextProvider>
                  </DoctorContextProvider>
                </AdminAppContextProvider>
              </AdminContextProvider>
            )}
          </AppContext.Consumer>
        </AppContextProvider>
      </DarkModeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

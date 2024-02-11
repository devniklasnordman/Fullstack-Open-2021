import React from 'react' // Ensure React is imported when using JSX
import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationProvider } from './contexts/NotificationContext'
import { UserProvider } from './contexts/UserContext'
import { Provider as ReduxProvider } from 'react-redux' // Importing with an alias to avoid confusion
import { store } from './store'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ReduxProvider store={store}>
    <UserProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </UserProvider>
  </ReduxProvider>
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRoutes from './router/routes.tsx'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <AppRoutes />
    <Toaster/>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)

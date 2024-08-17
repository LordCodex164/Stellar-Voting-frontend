import { useState } from 'react'
import AppRoutes from './router/routes'
import './App.css'
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from "./store/store"

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes/>
      </PersistGate>
    </Provider>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'
import App from './App'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

// Simple function to get the library
function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider)
}

// Render the app without strict mode to avoid double initialization
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Web3ReactProvider>
  </Provider>
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {store} from 'react-redux'
import './index.css'
import {Provider as alertProvider,positions,transitions} from 'react-alert'
import alerttemplate from 'react-alert-template-basic'
const options={
  position:position.BOTTOM_CENTER,
  timeout:5000,
  transition:transitions.SCALE
}

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <alertProvider template={alerttemplate} {...options}>
      <App />
    </alertProvider>
    
   
  </Provider>,
)

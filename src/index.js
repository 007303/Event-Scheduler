import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Store from './Store/eventStore'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
const store=Store()
store.subscribe(()=>{
  console.log(store.getState())
})
ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>,
  document.getElementById('root')
)

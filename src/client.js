import 'babel-core/register'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Layout from './components/Layout'
import { Provider } from 'mobx-react'

const stores = window.__INITIAL_STATE__

const jsx = (
  <Provider stores={stores}>
    <Router>
      <Layout />
    </Router>
  </Provider>
)


const app = document.getElementById('app')
ReactDOM.hydrate(jsx, app)

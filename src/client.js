import 'babel-core/register'
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Layout from './components/Layout'
import { Provider } from 'mobx-react'
import { Event } from './store'


const { event } = window.__INITIAL_STATE_EVENT__

const stores = {
  event: new Event(event.users)
}

const jsx = (
  <Provider stores={stores}>
    <Router>
      <Layout />
    </Router>
  </Provider>
)


const app = document.getElementById('app')
ReactDOM.hydrate(jsx, app)

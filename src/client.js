import 'babel-core/register'
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout'
import { Provider } from 'mobx-react'
import { Event, Network } from './store'
const { event, network } = window.__INITIAL_STATE__

const stores = {
  event: new Event(event.events, event.event),
  network: new Network(network.requestError)
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

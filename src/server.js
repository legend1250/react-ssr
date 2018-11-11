import express from 'express'
import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { parse } from 'url'
import Helmet from 'react-helmet'
import Layout from './components/Layout'
import { Provider } from 'mobx-react'
import { Event } from './store'
import { fetchUsers, getEvents } from './api'

const app = express()

app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('/*', async (req, res) => {
  const parsedUrl = parse(req.url, true)
  const { pathname, query } = parsedUrl
  console.log('query: ' ,pathname, query)

  const context = { }
  const users = await fetchUsers()
  const events = await getEvents({limit: 10})
  console.log('events: ' ,events)

  const stores = {
    event: new Event(users)
  }
  
  const jsx = (
    <Provider stores={stores}>
      <StaticRouter context={ context } location={ req.url }>
        <Layout />
      </StaticRouter>
    </Provider>
  )
  const reactDom = renderToString(jsx)
  const helmetData = Helmet.renderStatic()

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(htmlTemplate(reactDom, stores, helmetData))

})

app.listen(2048)

function htmlTemplate(reactDom, mobxStores, helmetData) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            ${ helmetData.title.toString() }
            ${ helmetData.meta.toString() }
            <title>React SSR</title>
            <link rel="shortcut icon" href="/static/favicon.ico">
        </head>
        
        <body>
            <div id="app">${ reactDom }</div>
            <script>
              window.__INITIAL_STATE_EVENT__ = ${ JSON.stringify(mobxStores) };
            </script>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `
}

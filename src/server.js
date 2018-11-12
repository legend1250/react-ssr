import express from 'express'
import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { parse } from 'url'
import Helmet from 'react-helmet'
import Layout from './components/Layout'
import { Provider } from 'mobx-react'
import { Event, Network } from './store'
import { getEvents, getEventById } from './api'

const app = express()

app.use('/static', express.static(path.resolve(__dirname, '../dist')))

app.get('/*', async (req, res) => {
  const parsedUrl = parse(req.url, true)
  const { pathname } = parsedUrl
  const context = { redirect: true }

  const { data: { events } } = await getEvents({limit: 10})

  let stores = {
    event: new Event(events),
    network: new Network()
  }

  if(pathname.startsWith('/event')){
    const id = pathname.split('-').pop()
    const  { data: { event } } = await getEventById({id})
    if(!event){
      stores = {
        ...stores,
        network: new Network({code: 404, url: '/notfound'})
      }
    }
    else{
      stores = {
        ...stores,
        event: new Event(events, event)
      }
    }
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
              window.__INITIAL_STATE__ = ${ JSON.stringify( mobxStores ) };
            </script>
            <script src="/static/app.bundle.js"></script>
        </body>
        </html>
    `
}

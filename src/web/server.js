import compression from 'compression'
import express from 'express'
import httpProxy from 'http-proxy'

import { STATIC_PATH, WEB_PORT, API_URL } from '../shared/config'
import { isProd } from '../shared/util'
import renderApp from './render_app'

const app = express()

app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

const proxy = httpProxy.createProxyServer({ target: API_URL })
app.use('/api', (req, res) => {
  proxy.web(req, res)
})

app.get('/', (req, res) => {
  // console.log("Received request");
  res.send(renderApp())
})

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' : '(development)'}.`)
})

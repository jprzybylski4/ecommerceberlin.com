const express = require('express')
const next = require('next')
const LRUCache = require('lru-cache')
const querystring = require('query-string')
const fetch = require('isomorphic-unfetch')
const _keyBy = require('lodash/keyBy')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

const i18n = require('./i18n')

const apiUrl = 'https://api.eventjuicer.com/v1/public/hosts/targiehandlu.pl/'

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
})


app.prepare().then(() => {

  const server = express()


 //  server.get('/c,:id,:creative', (req, res) => {
 //    const queryParams = { id: req.params.id, creative : req.params.creative }
 //    res.redirect('/agenda?utm_content=')
 //
 //   // app.render(req, res, '/exhibitor', queryParams)
 // //  REDIRECT
 //    //renderAndCache(req, res, '/company', queryParams)
 //  })


   server.get('/stage,:stage', (req, res) => {
     const queryParams = { stage: req.params.stage }
    // app.render(req, res, '/exhibitor', queryParams)
     renderAndCache(req, res, '/stage', queryParams)
   })

   server.get('/ticket,:hash', (req, res) => {
     const queryParams = { hash: req.params.hash }
    // app.render(req, res, '/exhibitor', queryParams)
     renderAndCache(req, res, '/ticket', queryParams)
   })

   server.get('/thankyou,:hash', (req, res) => {
     const queryParams = { hash: req.params.hash }
     renderAndCache(req, res, '/thankyou', queryParams)
   })

   server.get('/archive,:id', (req, res) => {
     const queryParams = { id: req.params.id }
     renderAndCache(req, res, '/archive', queryParams)
   })

   server.get('/invite,:id', (req, res) => {
     const queryParams = { id: req.params.id }
     renderAndCache(req, res, '/invite', queryParams)
   })

   server.get('/:slug,s,:id', (req, res) => {
     const queryParams = { id: req.params.id }
     renderAndCache(req, res, '/speaker', queryParams)
   })

   server.get('/:slug,c,:id', (req, res) => {
     const queryParams = { id: req.params.id }
     renderAndCache(req, res, '/company', queryParams)
   })

    // Serve the item webpage with next.js as the renderer
    server.get('/setup', async (req, res) => {
      const texts = await i18n.getTexts(ssrCache, "purge" in req.query)
      app.render(req, res, '/setup', { texts })
    })

    // When rendering client-side, we will request the same data from this route
    server.get('/_data/texts', async (req, res) => {
      const texts = await i18n.getTexts(ssrCache)
      res.json(texts)
    })






   server.get('/', (req, res) => {
    renderAndCache(req, res, '/')
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

 server.listen(port, (err) => {
   if (err) throw err
   console.log(`> Ready on http://localhost:${port}`)
 })


})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})



async function fetchFromApiEndpoint (endpoint) {
  const _res = await fetch(`${apiUrl}${endpoint}`)
  const res = await _res.json()
  return res;
}

function cacheApiResult (endpoint) {

    if (ssrCache.has(endpoint)) {
      res.setHeader('x-api-cache', 'HIT')
      res.send(ssrCache.get(key))
      return
    }

    // fetchFromApiEndpoint(endpoint).
    // then(data => data.data).
    // then()
}


/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey (req) {
  return `${req.url}a`
}

async function renderAndCache (req, res, pagePath, queryParams) {

  const key = getCacheKey(req)

  if("purge" in req.query)
  {
    ssrCache.del(key)
  }

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams)

    // Something is wrong with the request, let's skip the cache
    if (dev || res.statusCode !== 200) {
      res.setHeader('x-cache', 'DEV')
      res.send(html)
      return
    }

    // Let's cache this page
    ssrCache.set(key, html)

    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams)
  }
}
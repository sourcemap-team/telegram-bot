const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const express = require('express')
const Store = require('data-store')
const bodyParser = require('body-parser')
const differenceBy = require('lodash/differenceBy')

const token = require('./token')
const TelegramApiController = require('./controllers/TelegramAPI')

const store = new Store({ name: 'Updates', path: 'store.json' })
store.set('lastUpdates', [])

const tmAPI = new TelegramApiController(token)

const app = express()
const port = 80
//
// tmAPI.getUpdates((err, res, body) => {
//     const items = body.result.filter(item => item.message !== undefined)
//     store.set('lastUpdates', items)
// })

let offset = 0

// setInterval(() => {
//     const lastUpdates = store.get('lastUpdates', [])
//
//     if (lastUpdates.length >= 10) {
//         offset += 10
//     }
//
//     tmAPI.getUpdates((err, res, body) => {
//         const items = body.result.filter(item => item.message !== undefined)
//
//         const preparedLastUpdates = lastUpdates.filter(
//             item => item.message !== undefined
//         )
//
//         const diff = differenceBy(items, preparedLastUpdates, 'message.date')
//
//         diff.forEach(item => {
//             tmAPI.sendMessage({
//                 chatId: item.message.chat.id,
//                 text: item.message.text,
//             })
//         })
//
//         store.set('lastUpdates', items)
//     })
// }, 2000)

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))

app.get('/', (req, res) => {
    res.writeHead(200)
    res.end('hello world')
})

const options = {
    key: fs.readFileSync(path.resolve(__dirname, 'domain.key'), 'utf8'),
    cert: fs.readFileSync(path.resolve(__dirname, 'domain.crt'), 'utf8'),
}

http.createServer(app).listen(80)

https.createServer(options, app).listen(443)

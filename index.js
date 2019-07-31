const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const express = require('express')
const bodyParser = require('body-parser')

const token = require('./token')
const TelegramApiController = require('./controllers/TelegramAPI')

const tmAPI = new TelegramApiController(token)

const app = express()

app.use(bodyParser.json())

app.use(
    express.static(path.resolve(__dirname, './encrypt'), {
        dotfiles: 'allow',
    })
)

app.post(`/${token}/`, (req, res) => {
    console.log(req, 'post')
    console.log('\n')
    console.log('\n')
    res.status(200).send({})
})

app.get(`/${token}/`, (req, res) => {
    console.log(req, 'get')
    res.status(200).send({})
})

app.get('/', (req, res) => {
    console.log(req.body)
    console.log('\n')
    res.status(200).send({})
})

const options = {
    key: fs.readFileSync(
        '/etc/letsencrypt/live/telegram-bot.oxem.ru/privkey.pem',
        'utf8'
    ),
    cert: fs.readFileSync(
        '/etc/letsencrypt/live/telegram-bot.oxem.ru/fullchain.pem',
        'utf8'
    ),
}

http.createServer(app).listen(80)

https.createServer(options, app).listen(443)

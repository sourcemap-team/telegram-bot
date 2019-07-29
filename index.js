const fs = require('fs')
const token = require('./token')
const express = require('express')

const TelegramApiController = require('./controllers/TelegramAPI')
const chatId = '347227894'
const text = 'HELLO WORLD'
console.log(token)

const tmAPI = new TelegramApiController(token)

tmAPI.sendMessage({ chatId, text }, (err, res, body) => {
    console.log(body)
})

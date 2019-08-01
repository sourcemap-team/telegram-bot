const request = require('request')
const queryString = require('query-string')

class TelegramAPIController {
    constructor(TOKEN) {
        this.token = TOKEN
        this.rootURL = `http://api.telegram.org/bot${this.token}`
    }

    getMe(cb) {
        request(`${this.rootURL}/getMe`, { json: true }, cb)
    }

    sendMessage({ chat_id, text, options }, cb) {
        const reply_markup =
            Math.random() > 0.5
                ? {
                      resize_keyboard: true,
                      one_time_keyboard: true,
                      keyboard: [['yes'], ['no']],
                  }
                : {}

        const data = {
            chat_id,
            text,
            reply_markup: JSON.stringify(reply_markup),
        }

        const query = queryString.stringify(data)

        request(`${this.rootURL}/sendMessage?${query}`, { json: true }, cb)
    }

    getUpdates(cb) {
        request(`${this.rootURL}/getUpdates`, { json: true }, cb)
    }

    setWebHook(url) {
        request(`${this.rootURL}/setWebhook`, { json: true }, cb)
    }
}

module.exports = TelegramAPIController

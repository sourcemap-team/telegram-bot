const path = require('path')

module.exports = function(app, tmApi) {
    app.get('/', (req, res) => {
        res.sendFile(path.resolve('../client', 'index.html'))
    })

    app.get('/getMe', (req, res) => {
        tmApi.getMe((tReq, tRes) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.status(200).json(tRes.body)
        })
    })
}

const express = require('express')
var app = express()
const path = require('path')
var bodyParser = require('body-parser')
const AccountModel = require('./models/account')
const accountRouter = require('./router/account')
// 2 cau lenh lay data tren post man
// npm i body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 
app.post('/register', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    AccountModel.create({
        username,
        password
    })
        .then(data => {
            res.json("tao tai khoan ok")
        })
        .catch(err => {
            res.status(500)
        })

})
app.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    AccountModel.findOne({
        username,
        password
    })
        .then(data => {
            if (data) {
                res.json("dang nhap thanh cong")
            } else {
                res.status(500).json("account k dung")
            }
        })
        .catch(err => {
            res.status(500)
        })

})
app.use('/api/account/', accountRouter)
// nguyen ca fodler public dc cong khai vidu css, image
app.use('/public', express.static(path.join(__dirname, '/public')))
app.get('/', (req, res, next) => {
    var duongdan = path.join(__dirname, "home.html")
    res.sendFile(duongdan)
})
// 
app.listen(3000, () => {
    console.log("Serve start on port")
})
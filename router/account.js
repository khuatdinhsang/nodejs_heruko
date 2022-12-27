const express = require('express')
// dung Monggodb để lấy dữ liệu
var router = express.Router()
const AccountModel = require('../models/account')
router.get('/', (req, res, next) => {
    AccountModel.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("loi serve")
        })
})
router.get('/:id', (req, res, next) => {
    var id = req.params.id
    AccountModel.findById(id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("loi serve")
        })
})
router.post('/', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    AccountModel.create({
        username,
        password
    })
        .then(data => res.json(data))
        .catch(err => res.status(500).json("loi server"))
})
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const newUsername = req.body.newUsername;
    const newPassword = req.body.newPassword;

    AccountModel.findByIdAndUpdate(id, {
        username: newUsername,
        password: newPassword,
    })
        .then(data => res.json(data))
        .catch(err => res.status(500).json("loi o serve"))

})
router.delete('/:id', (req, res, next) => {
    AccountModel.deleteOne({
        _id: req.params.id,

    })
        .then(data => res.json("da xoa thanh cong"))
        .catch(err => res.status(500).json("loi o serve"))
})


module.exports = router
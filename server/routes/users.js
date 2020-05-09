const express = require('express')
const router = express.Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const config = require('../config/dev')

router.post('/login', function (req, res) {
    const { email, password } = req.body
    
    if (!email) {
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'Eメールを入力してください !' }] })
    }
    if (!password) {
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'パスワードを入力してください !' }] })
    }

    User.findOne({ email }, function (err, foundUser) {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'User error', detail: 'エラーが発生しました !' }] })
        }

        if (!foundUser) {
            return res.status(422).send({ errors: [{ title: 'User error', detail: 'すでに存在しているユーザーです !' }] })
        }

        if (!foundUser.hasSamePassword(password)) {
            return res.status(422).send({ errors: [{ title: 'User error', detail: 'パスワードが一致しません !' }] })
        }
        
        //JWTトークンを発行する
        const token = jwt.sign({
            username: foundUser.username,
            userId: foundUser.id
        }, config.SECRET, { expiresIn: '1h' });

        return res.json(token)
    })
})

router.post('/register', function (req, res) {
    const { username, email, password, confirmPassword} = req.body
    // ↑と↓は同じ意味
    // const username = req.body.username
    // const email = req.body.email
    // const password = req.body.password
    // const confirmPassword = req.body.confirmPassword


    if (!username) {
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'ユーザー名を入力してください !' }] })
    }
    if (!email) {
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'Eメールを入力してください !' }] })
    }
    if (!password) {
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'パスワードを入力してください !' }] })
    }
    if ( password !== confirmPassword) {
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'パスワードが一致しません !' }] })
    }

    User.findOne({ email }, function (err, foundUser) {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'User error', detail: 'エラーが発生しました !' }] })
        }

        if (foundUser) {
            return res.status(422).send({ errors: [{ title: 'User error', detail: 'すでに存在しているユーザーです !' }] })
        }

        const user = new User({ username, email, password })
        user.save(function (err) {
            if (err) {
                return res.status(422).send({ errors: [{ title: 'User error', detail: 'エラーが発生しました !' }] })
            }
            return res.json({"registerd": true})
        })
    })

})

module.exports = router
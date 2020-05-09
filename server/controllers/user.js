const jwt = require('jsonwebtoken')

const User = require('../model/user')
const config = require('../config/dev')

function notAuthorized(res) {
    return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'ログインしてください !' }] })

}

exports.authMiddleware = function (req, res, next)  {
    const token = req.headers.authorization

    if (!token) {
        return notAuthorized(res)
    }

    jwt.verify(token.split(' ')[1], config.SECRET, function (err, decodedToken) {
        if (err) {
            return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: '無効なトークンです !' }] })
        }
        User.findById(decodedToken.userId, function (err, foundUser) {
            if (err) {
                return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: '無効なトークンです !' }] })
            }

            if (!foundUser) {
                return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'ユーザーが見つかりません !' }] })
            }

            next()
        })
    })
}
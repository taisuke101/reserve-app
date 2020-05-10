const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const config = require('./config')
const FakeDb = require('./fake-db')
const ProductRoutes = require('./routes/products')
const path = require('path')
const UserRoutes = require('./routes/users')

// データベースに接続
mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(
    () => {
        if (process.env.NODE_ENV !== 'production') {
            const fakeDb = new FakeDb()
            //fakeDb.initDb()
        }
    }
)


const app = express()
app.use(bodyParser.json())
app.use('/api/v1/products', ProductRoutes)
app.use('/api/v1/users', UserRoutes)

if (process.env.NODE_ENV === 'production') {
    const appPath = path.join(__dirname, '..', 'dist', 'reserve-app')
    app.use(express.static(appPath))
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(appPath, 'index.html'))
    })
}


const PORT = process.env.PORT || '3001'

//バックエンド側を起動し、正常に動作した時このメッセージを表示
app.listen(PORT, function() {
    console.log('I am running!')
})


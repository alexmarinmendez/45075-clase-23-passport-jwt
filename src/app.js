import express from 'express'
import __dirname from './utils.js'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import jwtRouter from './routes/jwt.routes.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser('codersecret'))
initializePassport()
app.use(passport.initialize())
app.use(express.static(__dirname+'/public'))
// app.use('/', (req, res) => res.send('OK'))
app.use('/jwt', jwtRouter)

app.listen(8080, () =>  console.log('Server Up'))
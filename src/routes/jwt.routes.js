import { Router } from 'express'
import passport from 'passport'
import { generateToken, authToken, passportCall } from '../utils.js'

const router = Router()

const users = [{ email: 'profe@coder.com', password: 'c0d3r' }]

router.post('/register', (req, res) => {
    const user = req.body
    if (users.find(item => item.email === user.email)) {
        return res.status(400).send({ status: 'error', error: 'User already exits'})
    }
    users.push(user)
    const access_token = generateToken(user)
    res.send({ status: 'success', access_token})
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    const user = users.find(item => item.email === email && item.password === password)
    if (!user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    const access_token = generateToken(user)
    // res.send({ status: 'sucess', access_token })
    res.cookie('quebonitosoy', access_token).send({ status: 'success' })
})

// router.get('/private', authToken, (req, res) => {
// router.get('/private', passport.authenticate('jwt', { session: false }), (req, res) => {
router.get('/private', passportCall('jwt'), (req, res) => {
    res.send({ status: 'success', payload: req.user })
})

export default router

import { fileURLToPath } from 'url'
import { dirname } from 'path'
import jwt from 'jsonwebtoken'
import passport from 'passport'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

export const PRIVATE_KEY = 'victoriasecret'

export const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })
    return token
}

export const authToken = (req, res, next) => {
    let token = req.headers.auth
    if (!token) token = req.cookies['quebonitosoy']
    if (!token) return res.status(401).send({ error: "Not auth" })
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: "Not Authorized" })
        req.user = credentials.user
        next()
    })
}

export const passportCall = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(error, user, info) {
            if (error) return next(error)
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }
            req.user = user
            next()
        })(req, res, next)
    }
}
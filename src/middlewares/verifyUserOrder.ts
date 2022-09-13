import express from 'express'
import jwt from 'jsonwebtoken'

const TOKEN = process.env.TOKEN as string

const verifyUser = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const user_id = Number(req.body.user_id)
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const verified = parseJwt(token)
        if (verified.id === user_id) {
            next()
        } else throw new Error()
    } catch (e) {
        res.send('user_id is incorrect')
    }
}

// herlper function
function parseJwt(token: string) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

export default verifyUser

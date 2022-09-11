import express from 'express'
import jwt from 'jsonwebtoken'

const TOKEN = process.env.TOKEN as string

const verifyAuth = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const verified = jwt.verify(token, TOKEN)
        // console.log(verified);
        if (verified) next()
        else throw new Error()
    } catch (err) {
        res.send('Not Verified')
    }
}

export default verifyAuth

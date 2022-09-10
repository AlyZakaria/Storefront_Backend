import express from 'express'
import jwt from 'jsonwebtoken'

const verifyAuth = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        jwt.verify(req.body.token, process.env.TOKEN as string)
            ? next()
            : res.send('Not Verified')
    } catch (err) {
        res.send('Not Verified')
    }
}

export default verifyAuth

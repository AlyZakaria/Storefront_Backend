import express from 'express'
import userObject from '../models/users'

const user = new userObject()

export default class userHandler {
    index = async (
        _req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const users = await user.index()
            res.json(users)
        } catch (e) {
            res.status(404)
            res.send('Error')
        } finally {
            next()
        }
    }
    show = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const getUser = await user.show(Number(req.params.id))
            res.json(getUser)
        } catch (e) {
            res.send('User not found..')
        } finally {
            next()
        }
    }
    delete = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const deletedUser = await user.delete(Number(req.params.id))
            res.json(deletedUser)
        } catch (e) {
            res.send('User not found')
        } finally {
            next()
        }
    }
    create = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const newUser = await user.create(
                req.body.username,
                req.body.password
            )
            res.json(newUser)
        } catch (e) {
            console.log(e)
            res.send('Cannot create user')
        } finally {
            next()
        }
    }
}

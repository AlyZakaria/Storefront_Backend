import express from 'express'
import userObject from '../models/users'
import jwt from 'jsonwebtoken'

const tokenSecret = process.env.TOKEN
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
            res.send('No users Found')
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
            let token = jwt.sign(getUser, tokenSecret as string)
            res.json(token)
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
                req.body.firstName,
                req.body.secondName,
                req.body.password
            )
            res.json(newUser)
        } catch (e) {
            res.send('Cannot create user')
        } finally {
            next()
        }
    }
    update = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            let id = Number(req.params.id)
            let firstName = req.body.firstName
            let secondName = req.body.secondName
            let password = req.body.password
            const updatedUser = await user.update(
                id,
                firstName,
                secondName,
                password
            )
            res.json(updatedUser)
        } catch (e) {
            res.send('Cannot update user')
        } finally {
            next()
        }
    }
    authentication = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            let firstName = req.body.firstName
            let secondName = req.body.secondName
            let password = req.body.password
            const getUser = await user.authentication(
                firstName,
                secondName,
                password
            )
            res.json(getUser)
            next()
        } catch (e) {
            res.send('User Not Found')
        }
    }
}

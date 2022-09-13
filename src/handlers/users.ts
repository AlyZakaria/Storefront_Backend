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
                req.body.firstname,
                req.body.secondname,
                req.body.password
            )
            let token = jwt.sign(newUser, tokenSecret as string)
            res.json(token)
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
            let firstname = req.body.firstname
            let secondname = req.body.secondname
            let password = req.body.password
            const updatedUser = await user.update(
                id,
                firstname,
                secondname,
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
            let firstname = req.body.firstname
            let secondname = req.body.secondname
            let password = req.body.password
            const getUser = await user.authentication(
                firstname,
                secondname,
                password
            )
            // console.log(getUser)
            res.json(getUser)
            next()
        } catch (e) {
            res.send('User Not Found')
        }
    }
}

import express from 'express'
import userHandler from '../handlers/users'
import bodyParser from 'body-parser'
import validate from '../middlewares/checkUserInputs'
import verifyAuth from '../middlewares/verifyAuth'

const userHandle = new userHandler()

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuth, userHandle.index)
    app.get('/users/:id', verifyAuth, userHandle.show)
    app.delete('/users/:id', verifyAuth, userHandle.delete)
    app.post('/users', bodyParser.json(), validate, userHandle.create)
    app.post(
        '/users/authentication',
        bodyParser.json(),
        userHandle.authentication
    )
}

export default userRoutes

import express from 'express'
import userHandler from '../handlers/users'
import bodyParser from 'body-parser'
import validate from '../middlewares/checkInputs'

const userHandle = new userHandler()

const userRoutes = (app: express.Application) => {
    app.get('/users', userHandle.index)
    app.get('/users/:id', userHandle.show)
    app.delete('/users/:id', userHandle.delete)
    app.post('/users', bodyParser.json(), validate, userHandle.create)
}

export default userRoutes

import express from 'express'
import orderHandler from '../handlers/order'
import bodyParser from 'body-parser'
import verifyAuth from '../middlewares/verifyAuth'
import verifyUser from '../middlewares/verifyUserOrder'

const orderHandle = new orderHandler()

const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuth, orderHandle.index)
    app.get('/orders/:id', verifyAuth, orderHandle.show)
    app.delete('/orders/:id', verifyAuth, orderHandle.delete)

    // verify user => to check that user_id in body is same in token
    app.post(
        '/orders',
        bodyParser.json(),
        verifyAuth,
        verifyUser,
        orderHandle.create
    )

    // add product to order
    app.post(
        '/orders/:id/products',
        bodyParser.json(),
        verifyAuth,
        orderHandle.addProduct
    )

    app.get(
        '/users/:user_id/orders',
        verifyAuth,
        orderHandle.currentOrderByUser
    )
}

export default orderRoutes

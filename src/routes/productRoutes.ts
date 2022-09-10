import express from 'express'
import productHandler from '../handlers/product'
import bodyParser from 'body-parser'
import verifyAuth from '../middlewares/verifyAuth'

const productHandle = new productHandler()

const productRoutes = (app: express.Application) => {
    app.get('/products', productHandle.index)
    app.get('/products/:id', productHandle.show)
    app.post('/products', bodyParser.json(), verifyAuth, productHandle.create)
}

export default productRoutes

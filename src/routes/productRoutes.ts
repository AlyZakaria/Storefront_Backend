import express from 'express'
import productHandler from '../handlers/product'
import bodyParser from 'body-parser'
import verifyAuth from '../middlewares/verifyAuth'

const productHandle = new productHandler()

const productRoutes = (app: express.Application) => {
    app.get('/products', verifyAuth, productHandle.index)
    app.get('/products/:id', verifyAuth, productHandle.show)
    app.post('/products', bodyParser.json(), productHandle.create)
    app.post(
        '/products/:category',
        verifyAuth,
        productHandle.getProductsByCategory
    )
    app.put(
        '/products/:id',
        bodyParser.json(),
        verifyAuth,
        productHandle.update
    )
    app.get('/top-products', productHandle.getTopProducts)
}

export default productRoutes

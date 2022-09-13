import express from 'express'
import orderObject from '../models/order'

const order = new orderObject()

class orderHandler {
    index = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const getOrders = await order.index()
            res.json(getOrders)
        } catch (e) {
            res.send('No Orders Found..')
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
            const getOrder = await order.show(Number(req.params.id))
            res.json(getOrder)
        } catch (e) {
            res.send('Order not Found..')
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
            const deletedOrder = await order.delete(Number(req.params.id))
            res.json(deletedOrder)
            next()
        } catch (e) {
            res.status(404)
            res.send('Order not Found..')
        }
    }
    create = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const status = req.body.status
            const user_id = Number(req.body.user_id)
            const newOrder = await order.create(status, user_id)
            res.json(newOrder)
        } catch (e) {
            res.send('Can not create the Order')
        } finally {
            next()
        }
    }

    // add products to order
    addProduct = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const order_id = Number(req.params.id)
            const product_id = Number(req.body.product_id)
            const quantity = Number(req.body.quantity)
            const addedProduct = await order.addProduct(
                order_id,
                product_id,
                quantity
            )
            res.json(addedProduct)
        } catch (e) {
            res.send('Can not add the product to the Order..')
        } finally {
            next()
        }
    }
    // getUsersOrder
    currentOrderByUser = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const user_id = Number(req.params.user_id)
            const getOrders = await order.currentOrderByUser(user_id)
            res.json(getOrders)
        } catch (e) {
            res.send('Can not get the ordres details...')
        } finally {
            next()
        }
    }
}

export default orderHandler

import { Console } from 'console'
import express from 'express'
import productObject from '../models/product'

const product = new productObject()

export default class productHandler {
    index = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const products = await product.index()
            res.json(products)
            next()
        } catch (e) {
            res.status(404)
            res.send('Cannot find product')
        }
    }
    create = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            let name = req.body.name
            let price = req.body.price
            let category = req.body.category
            //to check if category is defined or not
            if (typeof category === 'undefined')
                category = 'Category is not defined'
            const newProduct = await product.create(
                name,
                Number(price),
                category
            )
            res.send(newProduct)
            next()
        } catch (e) {
            res.send('Cannot create Product')
        }
    }
    show = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const getProduct = await product.show(Number(req.params.id))
            res.json(getProduct)
        } catch (e) {
            res.send('Product Not found')
        }
    }
}

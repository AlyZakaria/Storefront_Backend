import express from 'express'
import productObject from '../models/product'

const product = new productObject()

export default class productHandler {
    index = async (
        _req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const products = await product.index()
            res.json(products)
        } catch (e) {
            res.send('No products found..')
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
            let name = req.body.name
            let price = req.body.price
            let category = req.body.category
            const updatedProduct = await product.update(
                id,
                name,
                price,
                category
            )
            res.json(updatedProduct)
        } catch (e) {
            res.send('product can not be updated')
        } finally {
            next()
        }
    }
    getProductsByCategory = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const getProducts = await product.getProductsByCategory(
                req.params.category
            )
            //console.log(getProducts);
            res.json(getProducts)
        } catch (e) {
            res.send('Product with this kind of category not found')
        } finally {
            next()
        }
    }
    getTopProducts = async (
        _req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const getTopProducts = await product.getTopProducts()
            res.json(getTopProducts)
        } catch (e) {
            res.send('Error while finding top products')
        } finally {
            next()
        }
    }
}

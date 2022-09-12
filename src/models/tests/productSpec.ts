import productObject from '../product'
import { product } from '../product'
import client from '../../database'

const product_Object = new productObject()

describe('Testing Product-table', () => {
    let product = {
        name: 'Legion 5',
        price: 20000,
        category: 'laptops',
    }
    //create product
    it('Product created', async () => {
        const productCreated = await product_Object.create(
            product.name,
            product.price,
            product.category
        )
        expect([
            productCreated.name,
            productCreated.price,
            productCreated.category,
        ]).toEqual([product.name, product.price, product.category])
    })

    // get all products
    it('get all products using index-method', async () => {
        const products = await product_Object.index()
        expect(products.length).toEqual(1)
    })
    // get specific product using show-method
    it('get specific product using show-method', async () => {
        const products = await product_Object.show(1)
        expect([products.name, products.price, products.category]).toEqual([
            product.name,
            product.price,
            product.category,
        ])
    })
    //get product by category
    it('get product by category', async () => {
        const products = await product_Object.getProductsByCategory('laptop')
        expect(products[0].category).toEqual(product.category)
    })
    // update product
    it('Product has been updated', async () => {
        product.price = 18000
        const updatedProduct = await product_Object.update(
            1,
            product.name,
            product.price,
            product.category
        )
        expect(updatedProduct.price).toBe(product.price)
    })

    afterAll(async () => {
        try {
            const conn = await client.connect()
            const query = `TRUNCATE TABLE users , orders, products ,order_products RESTART IDENTITY;`
            const result = await conn.query(query)
            conn.release()
        } catch (err) {}
    })
})

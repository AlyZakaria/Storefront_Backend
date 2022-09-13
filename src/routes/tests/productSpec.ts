import app from '../../server'
import supertest from 'supertest'
import client from '../../database'
import { product } from '../../models/product'
import { user } from '../../models/users'
import bcrypt from 'bcrypt'

const request = supertest(app)
describe('Product endpoints', () => {
    let token: string
    let user: user = {
        firstname: 'Aly',
        secondname: 'Zakaria',
        password: '0000',
    }
    let product: product = {
        name: 'legion 5',
        price: 20000,
        category: 'laptops',
    }

    //first we need to create user
    it('create.. /users [POST] works', async () => {
        const response = await request
            .post('/users')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(user)
        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        token = response.body
    })

    // create product
    it('create.. /products [POST] works', async () => {
        const response = await request
            .post('/products')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(product)

        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        expect([
            response.body.name,
            response.body.price,
            response.body.category,
        ]).toEqual([product.name, product.price, product.category])
    })
    // get product by id
    it('show.. /products/:id [GET] works', async () => {
        const response = await request
            .get('/products/1')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(product)

        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        expect([
            response.body.name,
            response.body.price,
            response.body.category,
        ]).toEqual([product.name, product.price, product.category])
    })

    // update product
    it('update.. /products/:id [PUT] works', async () => {
        product.price = 22000
        const response = await request
            .put('/products/1')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(product)
        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        expect([
            response.body.name,
            response.body.price,
            response.body.category,
        ]).toEqual([product.name, product.price, product.category])
    })
    // get product by category
    it('getProductsByCategory... /products/category [POST] works', async () => {
        const response = await request
            .post('/products/laptop')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        expect([
            response.body[0].name,
            response.body[0].price,
            response.body[0].category,
        ]).toEqual([product.name, product.price, product.category])

        /// enter wrong test case
        const res = await request
            .post('/products/mobile')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(404)
        expect(res.body).toEqual({})
    })

    //get all products
    it('index.. /products [GET] works', async () => {
        const response = await request
            .get('/products')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
        expect(response.body).not.toBeNull()
        expect([
            response.body[0].name,
            response.body[0].price,
            response.body[0].category,
        ]).toEqual([product.name, product.price, product.category])
    })

    // to delete all data in database
    afterAll(async () => {
        try {
            const conn = await client.connect()
            const query = `TRUNCATE TABLE users ,products, orders, order_products RESTART IDENTITY;`
            const result = await conn.query(query)
            conn.release()
        } catch (err) {}
    })
})

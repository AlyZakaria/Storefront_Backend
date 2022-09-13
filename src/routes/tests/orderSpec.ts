import app from '../../server'
import supertest from 'supertest'
import client from '../../database'
import { product } from '../../models/product'
import { user } from '../../models/users'
import { order } from '../../models/order'
import bcrypt from 'bcrypt'

const request = supertest(app)
type product_order = {
    id?: number
    order_id: number
    product_id: number
    quantity: number
}

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
let order: order = {
    status: 'active',
    user_id: '1',
}

let productOrder: product_order = {
    order_id: 1,
    product_id: 1,
    quantity: 2,
}

describe('orders endpoints', () => {
    // create user & product & order
    user_product_order()

    // show order
    it('show.. /orders/:id [GET] works', async () => {
        const response = await request
            .get('/orders/1')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        expect([response.body.status, response.body.user_id]).toEqual([
            order.status,
            order.user_id,
        ])
    })

    // delete order
    it('delete.. /orders/:id [DELETE] works', async () => {
        const response = await request
            .delete('/orders/1')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        expect([response.body.status, response.body.user_id]).toEqual([
            order.status,
            order.user_id,
        ])
        // to check that the order deleted successfully
        const res = await request
            .delete('/orders/1')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(404)
        expect(res.body).toEqual({})
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

describe('order_products endpoints', () => {
    // create user & product & order
    user_product_order()

    // add products to order
    it('addProduct.. /orders/:id/products [POST] works', async () => {
        const response = await request
            .post('/orders/1/products')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(productOrder)

        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        expect([
            Number(response.body.order_id),
            Number(response.body.product_id),
            response.body.quantity,
        ]).toEqual([
            productOrder.order_id,
            productOrder.product_id,
            productOrder.quantity,
        ])
    })
    // currentOrderByUser
    it('currentOrderByUser.. /users/:user_id/orders [GET] works', async () => {
        const response = await request
            .get('/users/1/orders')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(response.body.length).toBe(1)
        expect(Number(response.body[0].order_id)).toBe(productOrder.order_id)
        expect(response.body[0].quantity).toBe(productOrder.quantity)
        expect(response.body[0].status).toBe(order.status)
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

function user_product_order() {
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

    // create order
    it('create.. /orders [POST] works', async () => {
        const response = await request
            .post('/orders')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(order)

        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        expect([response.body.status, response.body.user_id]).toEqual([
            order.status,
            order.user_id,
        ])
    })
}

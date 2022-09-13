import orderObject from '../../../models/order'
import { order } from '../../../models/order'
import userObject from '../../../models/users'
import { user } from '../../../models/users'
import client from '../../../database'
import productObject from '../../../models/product'
import { product } from '../../../models/product'
import supertest from 'supertest'
import app from '../../../server'
import { create } from 'domain'

const request = supertest(app)

let tokens: string[] = []

let user_1: user = {
    firstname: 'Aly',
    secondname: 'Zakaria',
    password: '0000',
}
let user_2: user = {
    firstname: 'Ahmed',
    secondname: 'Mohamed',
    password: '0000',
}
let users: user[] = [user_1, user_2]

// array_prdoucts
const products: product[] = [
    {
        name: 'samsung A5',
        price: 3000,
        category: 'mobiles',
    },
    {
        name: 'iphone 13',
        price: 20000,
        category: 'mobiles',
    },
    {
        name: 'legion 5',
        price: 22000,
        category: 'laptops',
    },
    {
        name: 'samsung smart Tv',
        price: 35000,
        category: 'televisions',
    },
    {
        name: 'Ray-Ban',
        price: 50000,
        category: 'sunglasses',
    },
    {
        name: 'sherlock-Holmes_book',
        price: 200,
        category: 'books',
    },
]

let orders: order[] = [
    {
        status: 'active',
        user_id: '1',
    },
    {
        status: 'active',
        user_id: '2',
    },
]

describe('top-products endpoint', () => {
    // we need to create users and products and orders
    create_users()
    create_products()
    create_orders()

    // add products to orders
    addProducts()

    //get Top 5 prdoucts
    it(`Get Top 5 prdoucts`, async () => {
        const response = await request
            .get('/top-products')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
        //console.log(response.body)
        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        expect(response.body.length).toBe(5)
        for (let i = 0; i < response.body.length - 1; i++) {
            expect(response.body[i].quantity).toBeGreaterThan(
                response.body[i + 1].quantity
            )
        }
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

function create_users() {
    //first we need to create users
    for (let i = 0; i < users.length; i++) {
        it(`create user_${i + 1}.. /users [POST] works`, async () => {
            const response = await request
                .post('/users')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(users[i])
            expect(response.statusCode).toBe(200)
            expect(response.body).not.toBeNull()
            tokens.push(response.body)
        })
    }
}

function create_products() {
    for (let i = 0; i < products.length; i++) {
        it(`create product_${i + 1}.. /products [POST] works`, async () => {
            const response = await request
                .post('/products')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(products[i])

            expect(response.statusCode).toBe(200)
            expect(response.body).not.toBeNull()
            expect([
                response.body.name,
                response.body.price,
                response.body.category,
            ]).toEqual([
                products[i].name,
                products[i].price,
                products[i].category,
            ])
        })
    }
}

function create_orders() {
    // create a new order for user 1
    for (let i = 0; i < orders.length; i++) {
        // create order
        it('create.. /orders [POST] works', async () => {
            const response = await request
                .post('/orders')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${tokens[i]}`)
                .send(orders[i])

            expect(response.statusCode).toBe(200)
            expect(response.body).not.toBeNull()
            expect([response.body.status, response.body.user_id]).toEqual([
                orders[i].status,
                orders[i].user_id,
            ])
        })
    }
}

// add products to orders
function addProducts() {
    for (let i = 0; i < products.length; i++) {
        it(`addProduct_${
            i + 1
        } to order_1 /orders/:id/products [POST] works`, async () => {
            const response = await request
                .post('/orders/1/products')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${tokens[0]}`)
                .send({
                    order_id: 1,
                    product_id: i + 1,
                    quantity: i + 1,
                })

            expect(response.statusCode).toBe(200)
            expect(response.body).not.toBeNull()
            expect([
                Number(response.body.order_id),
                Number(response.body.product_id),
                response.body.quantity,
            ]).toEqual([1, i + 1, i + 1])
        })
    }
    for (let i = 0; i < products.length; i++) {
        it(`addProduct_${
            i + 1
        } to order_2 /orders/:id/products [POST] works`, async () => {
            const response = await request
                .post('/orders/2/products')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${tokens[1]}`)
                .send({
                    order_id: 2,
                    product_id: i + 1,
                    quantity: i + 1,
                })

            expect(response.statusCode).toBe(200)
            expect(response.body).not.toBeNull()
            expect([
                Number(response.body.order_id),
                Number(response.body.product_id),
                response.body.quantity,
            ]).toEqual([2, i + 1, i + 1])
        })
    }
}

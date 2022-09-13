import orderObject from '../../order'
import { order } from '../../order'
import userObject from '../../users'
import { user } from '../../users'
import client from '../../../database'
import productObject from '../../product'
import { product } from '../../product'

const order_Object = new orderObject()
const product_Object = new productObject()
const User = new userObject()

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

// we need to create users and products and orders
describe('5 most popular products', () => {
    // create users
    // first_user
    it('user1 created', async () => {
        const userCreated: user = await User.create(
            user_1.firstname,
            user_1.secondname,
            user_1.password
        )
        expect([
            userCreated.id,
            userCreated.firstname,
            userCreated.secondname,
        ]).toEqual([1, user_1.firstname, user_1.secondname])
    })
    // second user
    it('user2 created', async () => {
        const userCreated: user = await User.create(
            user_2.firstname,
            user_2.secondname,
            user_2.password
        )
        expect([
            userCreated.id,
            userCreated.firstname,
            userCreated.secondname,
        ]).toEqual([2, user_2.firstname, user_2.secondname])
    })

    // create products
    createProducts(products)

    // create orders
    createOrders(orders)

    // add products to order
    addProducts(products)

    //get Top 5 prdoucts
    it(`Get Top 5 prdoucts`, async () => {
        const products = await product_Object.getTopProducts()
        // console.log(products);
        for (let i = 0; i < products.length - 1; i++) {
            expect(products[i].quantity).toBeGreaterThan(
                products[i + 1].quantity
            )
        }
    })

    // to delete all data in database
    afterAll(async () => {
        try {
            const conn = await client.connect()
            const query = `TRUNCATE TABLE users , orders, products ,order_products RESTART IDENTITY;`
            const result = await conn.query(query)
            conn.release()
        } catch (err) {}
    })
})

// create products
function createProducts(products: product[]) {
    for (let i = 0; i < products.length; i++) {
        it(`product_${i + 1} created`, async () => {
            const productCreated = await product_Object.create(
                products[i].name,
                products[i].price,
                products[i].category
            )
            expect([
                productCreated.name,
                productCreated.price,
                productCreated.category,
            ]).toEqual([
                products[i].name,
                products[i].price,
                products[i].category,
            ])
        })
    }
}

// create order
function createOrders(orders: order[]) {
    for (let i = 0; i < orders.length; i++) {
        it(`order_${i + 1} created`, async () => {
            const createdOrder = await order_Object.create(
                orders[i].status,
                Number(orders[i].user_id)
            )
            expect([
                createdOrder.id,
                createdOrder.status,
                createdOrder.user_id,
            ]).toEqual([i + 1, orders[i].status, orders[i].user_id])
        })
    }
}

// add products to orders
function addProducts(products: product[]) {
    // add products to order_1
    for (let i = 0; i < products.length; i++) {
        it(`product_${i + 1} has been added to order_1`, async () => {
            const addedProduct = await order_Object.addProduct(1, i + 1, i + 1)
            expect([
                Number(addedProduct.order_id),
                Number(addedProduct.product_id),
                addedProduct.quantity,
            ]).toEqual([1, i + 1, i + 1])
        })
    }

    // add products to order_2
    for (let i = 0; i < products.length; i++) {
        it(`product_${i + 1} has been added to order_2`, async () => {
            const addedProduct = await order_Object.addProduct(2, i + 1, i + 1)
            expect([
                Number(addedProduct.order_id),
                Number(addedProduct.product_id),
                addedProduct.quantity,
            ]).toEqual([2, i + 1, i + 1])
        })
    }
}

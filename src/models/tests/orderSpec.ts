import orderObject from '../order'
import { order } from '../order'
import userObject from '../users'
import { user } from '../users'
import client from '../../database'
import productObject from '../product'

const order_Object = new orderObject()
const product_Object = new productObject()
const User = new userObject()

// to create order first we need to create user
let user: user = {
    firstname: 'Aly',
    secondname: 'Zakaria',
    password: '0000',
}
let order: order = {
    status: 'active',
    user_id: '1',
}
type product_order = {
    id?: number
    order_id: number
    product_id: number
    quantity: number
}

describe('Testing order-table', () => {
    // creating user first
    it('user created', async () => {
        const userCreated: user = await User.create(
            user.firstname,
            user.secondname,
            user.password
        )
        expect([
            userCreated.id,
            userCreated.firstname,
            userCreated.secondname,
        ]).toEqual([1, user.firstname, user.secondname])
    })
    /// create order
    it('order created', async () => {
        const createdOrder = await order_Object.create(
            order.status,
            Number(order.user_id)
        )
        expect([
            createdOrder.id,
            createdOrder.status,
            createdOrder.user_id,
        ]).toEqual([1, order.status, order.user_id])
    })
    // get all orders
    it('get all orders using index-method', async () => {
        const orders = await order_Object.index()
        expect(orders.length).toEqual(1)
    })

    // get specified order
    it('get specified order using show-method', async () => {
        const getOrder = await order_Object.show(1)
        expect([getOrder.id, getOrder.status, getOrder.user_id]).toEqual([
            1,
            order.status,
            order.user_id,
        ])
    })

    // delete specified order
    it('Order has been deleted', async () => {
        const deletedOrder = await order_Object.delete(1)
        // check by using show methow
        const getOrder = await order_Object.show(1)
        expect(getOrder).toBeUndefined()
    })
    afterAll(async () => {
        try {
            const conn = await client.connect()
            const query = `TRUNCATE TABLE users , orders, order_products RESTART IDENTITY;`
            const result = await conn.query(query)
            conn.release()
        } catch (err) {}
    })
})

describe('Testing order-products-table', () => {
    let productOrder: product_order = {
        order_id: 1,
        product_id: 1,
        quantity: 5,
    }
    let product = {
        name: 'Legion 5',
        price: 20000,
        category: 'laptops',
    }
    // first we need to create order & product & user
    it('user created', async () => {
        const userCreated: user = await User.create(
            user.firstname,
            user.secondname,
            user.password
        )
        expect([
            userCreated.id,
            userCreated.firstname,
            userCreated.secondname,
        ]).toEqual([1, user.firstname, user.secondname])
    })
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
    it('order created', async () => {
        const createdOrder = await order_Object.create(
            order.status,
            Number(order.user_id)
        )
        expect([
            createdOrder.id,
            createdOrder.status,
            createdOrder.user_id,
        ]).toEqual([1, order.status, order.user_id])
    })

    // then create order
    it('product has been added to order', async () => {
        const addedProduct = await order_Object.addProduct(
            productOrder.order_id,
            productOrder.product_id,
            productOrder.quantity
        )
        expect([
            Number(addedProduct.order_id),
            Number(addedProduct.product_id),
            addedProduct.quantity,
        ]).toEqual([
            productOrder.order_id,
            productOrder.product_id,
            productOrder.quantity,
        ])
    })
    // get the orders of user
    it('get all orders of user', async () => {
        const getOrders = await order_Object.currentOrderByUser(1)
        expect(getOrders.length).toBe(1)
        expect(Number(getOrders[0].order_id)).toBe(productOrder.order_id)
        expect(getOrders[0].quantity).toBe(productOrder.quantity)
    })
    
    afterAll(async () => {
        try {
            const conn = await client.connect()
            const query = `TRUNCATE TABLE users ,products, orders, order_products RESTART IDENTITY;`
            const result = await conn.query(query)
            conn.release()
        } catch (err) {}
    })
})

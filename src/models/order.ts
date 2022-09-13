import client from '../database'

export interface order {
    id?: number
    status: string
    user_id: string
}

class orderObject {
    async index(): Promise<order[]> {
        const conn = await client.connect()
        try {
            const query = 'SELECT * FROM orders'
            const orders = await conn.query(query)
            if (!orders.rows.length) throw new Error()
            return orders.rows
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }
    async show(id: number): Promise<order> {
        const conn = await client.connect()
        try {
            const query = `SELECT * FROM orders where id = ${id};`
            const getOrder = await conn.query(query)
            return getOrder.rows[0]
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }
    async delete(id: number): Promise<order> {
        const conn = await client.connect()
        try {
            const query = `DELETE FROM orders WHERE id = ${id} RETURNING *;`
            const deletedOrder = await conn.query(query)
            if (!deletedOrder.rows.length) throw new Error()
            return deletedOrder.rows[0]
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }
    async create(status: string, user_id: number): Promise<order> {
        const conn = await client.connect()
        try {
            const query = `INSERT INTO orders (status , user_id) VALUES 
            ('${status}' , ${user_id}) RETURNING *;`
            const newOrder = await conn.query(query)
            return newOrder.rows[0]
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }

    // Add product to order
    async addProduct(
        order_id: number,
        product_id: number,
        quantity: number
    ): Promise<{
        id: number
        order_id: number
        product_id: number
        quantity: number
    }> {
        const conn = await client.connect()
        try {
            const query = `INSERT INTO order_products (order_id , product_id , quantity) VALUES 
            (${order_id} , ${product_id} , ${quantity}) RETURNING *;`
            const result = await conn.query(query)
            return result.rows[0]
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }

    // getUser's Orders
    async currentOrderByUser(user_id: number): Promise<
        {
            status: string
            order_id: number
            product_id: number
            quantity: number
        }[]
    > {
        const conn = await client.connect()
        try {
            const query = `SELECT status , order_id , product_id , quantity FROM orders INNER JOIN order_products
             ON orders.id = order_products.order_id WHERE user_id = ${user_id}; `
            const orderDetails = await conn.query(query)
            return orderDetails.rows
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }
}

export default orderObject

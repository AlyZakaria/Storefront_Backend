import { isMapIterator } from 'util/types'
import client from '../database'

export interface product {
    id?: number
    name: string
    price: number
    category?: string
}
type topProduct = {
    product_id: number
    quantity: number
}
class productObject {
    async index(): Promise<product[]> {
        const conn = await client.connect()
        try {
            const query = `SELECT * FROM products`
            const products = await conn.query(query)
            if (!products.rows.length) throw new Error()
            return products.rows
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }
    async create(
        name: string,
        price: number,
        category?: string
    ): Promise<product> {
        const conn = await client.connect()
        try {
            const query = `INSERT INTO products (name, price, category) VALUES
            ('${name}' , ${price}, '${category}') RETURNING * ;`
            const product = await conn.query(query)
            return product.rows[0]
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }
    async show(id: number): Promise<product> {
        const conn = await client.connect()
        try {
            const query = `SELECT * FROM products WHERE id = ${id};`
            const getProduct = await conn.query(query)
            if (!getProduct.rows.length) throw new Error()
            return getProduct.rows[0]
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }
    async update(
        id: number,
        name: string,
        price: number,
        category?: string
    ): Promise<product> {
        const conn = await client.connect()
        try {
            const query = `UPDATE products SET
            name = '${name}', price = ${price}, category = '${category}'
            WHERE id = ${id} RETURNING *;`
            const getProduct = await conn.query(query)
            return getProduct.rows[0]
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }
    // get the products by categories
    async getProductsByCategory(category: string): Promise<product[]> {
        const conn = await client.connect()
        try {
            const query = `SELECT * FROM products WHERE category LIKE '%${category}%'`
            const getProduct = await conn.query(query)
            if (!getProduct.rows.length) throw new Error()
            return getProduct.rows
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }

    // Get popular products
    async getTopProducts(): Promise<topProduct[]> {
        const conn = await client.connect()
        try {
            const query = `SELECT product_id , quantity FROM order_products;`
            const res = await conn.query(query)

            // we get top 5 products by getting summation of quantities of each product
            let map = this.puttingInMap(res.rows)
            let topFive = this.getTopFive(map)
            return topFive
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }

    // helper functions
    // select all products_name and their quantities and putting_In_Map

    private puttingInMap(products: topProduct[]): Map<number, number> {
        let map = new Map<number, number>()
        let value
        for (let i = 0; i < products.length; i++) {
            let product_id = Number(products[i].product_id)
            if (map.has(product_id)) {
                value = map.get(product_id)!
                value += products[i].quantity
                map.set(product_id, value)
            } else map.set(product_id, products[i].quantity)
        }
        const sortedmap = new Map([...map].reverse())
        return sortedmap
    }

    private getTopFive(map: Map<number, number>): topProduct[] {
        let topFive: topProduct[] = []
        let c = 0
        for (let [key, value] of map) {
            let product: topProduct = { product_id: key, quantity: value }
            topFive.push(product)
            if (c == 5) break
            c++
        }
        return topFive
    }
}

export default productObject

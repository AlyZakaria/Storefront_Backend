import client from '../database'

interface product {
    id: number
    name: string
    price: number
    category?: string
}

class productObject {
    async index(): Promise<product[]> {
        try {
            const conn = await client.connect()
            const query = `SELECT * FROM products`
            const products = await conn.query(query)
            conn.release()
            return products.rows
        } catch (e) {
            throw e
        }
    }
    async create(
        name: string,
        price: number,
        description?: string
    ): Promise<product> {
        try {
            const conn = await client.connect()
            const query = `INSERT INTO products (name, price, category) VALUES
            ('${name}' , ${price}, '${description}') RETURNING * ;`
            //console.log("here");
            const product = await conn.query(query)
            //console.log(product);
            conn.release()
            return product.rows[0]
        } catch (e) {
            throw e
        }
    }
    async show(id: number): Promise<product> {
        try {
            const conn = await client.connect()
            const query = `SELECT * FROM products WHERE id = ${id};`
            const getProduct = await conn.query(query)
            conn.release()
            return getProduct.rows[0]
        } catch (e) {
            throw e
        }
    }
}

export default productObject

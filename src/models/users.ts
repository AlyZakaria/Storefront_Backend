import client from '../database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface user {
    username: string
    password: string
    phone_number: Number
    birth_date: Date
}

const saltRounds = process.env.SALT_ROUNDS
const pepper = process.env.BCRYPT_PASSWORD
const tokenSecret = process.env.TOKEN

export default class userObject {
    async index(): Promise<user[]> {
        try {
            const conn = await client.connect()
            const query = `SELECT * FROM users`
            const users = await conn.query(query)
            conn.release()
            return users.rows
        } catch (e) {
            throw e
        }
    }
    async show(id: number): Promise<user> {
        try {
            const conn = await client.connect()
            const query = `SELECT * FROM users where id = ${id}`
            const user = await conn.query(query)
            conn.release()
            if (user.rows.length === 0) throw new Error()
            return user.rows[0]
        } catch (e) {
            throw e
        }
    }
    async delete(id: number): Promise<user> {
        try {
            const conn = await client.connect()
            const query = `DELETE FROM users WHERE id = ${id} Returning *`
            const deletedUser = await conn.query(query)
            if (deletedUser.rows.length === 0) throw new Error()
            conn.release()
            return deletedUser.rows[0]
        } catch (e) {
            throw e
        }
    }
    async create(
        username: string,
        password: string,
        phone_number: number,
        age: number
    ): Promise<string> {
        try {
            const conn = await client.connect()
            const hash = bcrypt.hashSync(password + pepper, Number(saltRounds))
            const query = `INSERT INTO users (username , password , phone_number , age) Values 
            ('${username}' , '${hash}' , ${phone_number} , ${age}) Returning *`
            const newUser = await conn.query(query)
            conn.release()
            if (newUser.rows.length === 0) throw new Error()
            let token = jwt.sign(newUser.rows[0], tokenSecret as string)
            return token
        } catch (e) {
            throw e
        }
    }
}

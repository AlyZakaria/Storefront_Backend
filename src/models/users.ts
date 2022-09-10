import client from '../database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface user {
    id: number
    firstName: string
    secondName: string
    password: string
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
        firstName: string,
        secondName: string,
        password: string
    ): Promise<string> {
        try {
            const conn = await client.connect()
            const hash = bcrypt.hashSync(password + pepper, Number(saltRounds))
            const query = `INSERT INTO users (firstname ,secondname, password) Values 
            ('${firstName}' , '${secondName}', '${hash}' ) Returning *`
            const newUser = await conn.query(query)
            conn.release()
            if (newUser.rows.length === 0) throw new Error()
            let token = jwt.sign(newUser.rows[0], tokenSecret as string)
            return token
        } catch (e) {
            throw e
        }
    }
    async authentication(
        firstName: string,
        secondName: string,
        password: string
    ): Promise<string> {
        try {
            const conn = await client.connect()
            const query = `SELECT * FROM users 
            WHERE firstname = '${firstName}' and secondname = '${secondName}';`
            const getUser = await conn.query(query)
            if (getUser.rows.length == 0) throw new Error()
            else {
                let user = getUser.rows;
                // to find the person if the firstName & SecondName are similar
                for(let i = 0; i < user.length; i++) {
                    if (bcrypt.compareSync(password + pepper, user[i].password))
                        {
                            let token = jwt.sign(user[i], tokenSecret as string)
                            return token;
                        }
                }
                 throw new Error()
            }
        } catch (error) {
            throw error
        }
    }
}

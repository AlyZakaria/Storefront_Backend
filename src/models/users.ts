import client from '../database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export interface user {
    id?: number
    firstname: string
    secondname: string
    password: string
}

const saltRounds = process.env.SALT_ROUNDS
const pepper = process.env.BCRYPT_PASSWORD
const tokenSecret = process.env.TOKEN

export default class userObject {
    async index(): Promise<user[]> {
        const conn = await client.connect()
        try {
            const query = `SELECT * FROM users`
            const users = await conn.query(query)
            return users.rows
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }
    async show(id: number): Promise<user> {
        const conn = await client.connect()
        try {
            const query = `SELECT * FROM users where id = ${id}`
            const user = await conn.query(query)
            if (user.rows.length === 0) throw new Error()
            return user.rows[0]
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }
    async delete(id: number): Promise<user> {
        const conn = await client.connect()
        try {
            const query = `DELETE FROM users WHERE id = ${id} Returning *`
            const deletedUser = await conn.query(query)
            if (deletedUser.rows.length === 0) throw new Error()
            return deletedUser.rows[0]
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }
    async create(
        firstname: string,
        secondname: string,
        password: string
    ): Promise<user> {
        const conn = await client.connect()
        try {
            const hash = bcrypt.hashSync(password + pepper, Number(saltRounds))
            const query = `INSERT INTO users (firstname ,secondname, password) VALUES 
            ('${firstname}' , '${secondname}', '${hash}' ) RETURNING *`
            const newUser = await conn.query(query)
            return newUser.rows[0]
        } catch (e) {
            console.log(e)
            throw e
        } finally {
            conn.release()
        }
    }
    async update(
        id: number,
        firstName: string,
        secondName: string,
        password: string
    ): Promise<user> {
        const conn = await client.connect()
        try {
            const hash = bcrypt.hashSync(password + pepper, Number(saltRounds))
            const query = `UPDATE users SET
            firstname = '${firstName}',
            secondname = '${secondName}', password = '${hash}'
            WHERE id = ${id} RETURNING *;`
            const updatedUser = await conn.query(query)
            return updatedUser.rows[0]
        } catch (e) {
            throw e
        } finally {
            conn.release()
        }
    }

    async authentication(
        firstName: string,
        secondName: string,
        password: string
    ): Promise<{
        user: user
        token: string
    }> {
        const conn = await client.connect()
        try {
            const query = `SELECT * FROM users 
            WHERE firstname = '${firstName}' and secondname = '${secondName}';`
            const getUser = await conn.query(query)
            if (getUser.rows.length == 0) throw new Error()
            else {
                let users = getUser.rows
                return this.getPerson(users, password)
            }
        } catch (error) {
            throw error
        } finally {
            conn.release()
        }
    }
    // helper function
    private getPerson(
        users: user[],
        password: string
    ): { user: user; token: string } {
        for (let i = 0; i < users.length; i++) {
            if (bcrypt.compareSync(password + pepper, users[i].password)) {
                let token = jwt.sign(users[i], tokenSecret as string)
                let userToken = { user: users[i], token: token }
                return userToken
            }
        }
        throw new Error()
    }
}

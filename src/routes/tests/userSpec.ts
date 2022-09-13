import app from '../../server'
import supertest from 'supertest'
import client from '../../database'
import { user } from '../../models/users'
import bcrypt from 'bcrypt'

const TOKEN = process.env.TOKEN as string
const request = supertest(app)
const saltRounds = process.env.SALT_ROUNDS
const pepper = process.env.BCRYPT_PASSWORD

describe('Users endpoints', () => {
    let token: string
    let body: user = {
        firstname: 'Aly',
        secondname: 'Zakaria',
        password: '0000',
    }
    //first we need to create user
    it('create.. /users [POST] works', async () => {
        const response = await request
            .post('/users')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(body)
        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        token = response.body
        //console.log(token)
    })
    // get specific user
    it('show.. /users/:id [GET] works', async () => {
        const response = await request
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect([response.body.firstname, response.body.secondname]).toEqual([
            body.firstname,
            body.secondname,
        ])
        expect(
            bcrypt.compareSync(body.password + pepper, response.body.password)
        ).toBeTruthy()
    })

    // update user
    it('update /users/:id [PUT] works', async () => {
        body.secondname = 'Fahmy'
        const response = await request
            .put('/users/1')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(body)

        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        expect([response.body.firstname, response.body.secondname]).toEqual([
            body.firstname,
            body.secondname,
        ])
        expect(
            bcrypt.compareSync(body.password + pepper, response.body.password)
        ).toBeTruthy()
    })

    // authentication test
    it('authentication /users/authentication [POST] works', async () => {
        const response = await request
            .post('/users/authentication')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(body)

        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        expect([
            response.body.user.firstname,
            response.body.user.secondname,
        ]).toEqual([body.firstname, body.secondname])
        expect(
            bcrypt.compareSync(
                body.password + pepper,
                response.body.user.password
            )
        ).toBeTruthy()
    })
    // get all users
    it('index.. /users [GET] works', async () => {
        const response = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        expect(response.body.length).toBe(1)
        expect([
            response.body[0].firstname,
            response.body[0].secondname,
        ]).toEqual([body.firstname, body.secondname])
        expect(
            bcrypt.compareSync(
                body.password + pepper,
                response.body[0].password
            )
        ).toBeTruthy()
    })

    // to delete user
    it('delete.. /users/:id [DELETE] works', async () => {
        const response = await request
            .delete('/users/1')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        expect([response.body.firstname, response.body.secondname]).toEqual([
            body.firstname,
            body.secondname,
        ])
        expect(
            bcrypt.compareSync(body.password + pepper, response.body.password)
        ).toBeTruthy()
        // to check that the users-table is empty
        const res = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).not.toBeNull()
        // should body be empty
        expect(res.body.length).toBe(0)
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

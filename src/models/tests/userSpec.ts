import userObject from '../users'
import { user } from '../users'
import client from '../../database'
import bcrypt from 'bcrypt'

const User = new userObject()
const pepper = process.env.BCRYPT_PASSWORD

describe('Testing users-table', async () => {
    let user: user = {
        firstname: 'Aly',
        secondname: 'Zakaria',
        password: '0000',
    }

    // creating user
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

    // get all users
    it('get all users using index-method', async () => {
        const getUsers = await User.index()
        expect(getUsers.length).toBe(1)
    })

    // show user
    it('get specified user using show-method', async () => {
        const getUser = await User.show(1)
        expect(getUser.firstname).toBe(user.firstname)
    })
    // update User
    it('user has been updated', async () => {
        const updateUser = await User.update(
            1,
            user.firstname,
            'Fahmy',
            user.password
        )
        user.secondname = 'Fahmy'
        expect(updateUser.secondname).toBe(user.secondname)
    })
    // authentication method
    it('user has been authenticated', async () => {
        const getUser = await User.authentication(
            user.firstname,
            'Fahmy',
            user.password
        )
        expect([getUser.user.firstname, getUser.user.secondname]).toEqual([
            user.firstname,
            user.secondname,
        ])
        expect(
            bcrypt.compareSync(user.password + pepper, getUser.user.password)
        ).toBeTruthy()
    })

    // Delete user
    it('user has been deleted', async () => {
        const getUser = await User.delete(1)
        /// use index method to check if user has been deleted
        const getUsers = await User.index()
        expect(getUsers.length).toBe(0)
    })

    afterAll(async () => {
        try {
            const conn = await client.connect()
            const query = `TRUNCATE TABLE users ,products ,orders, order_products RESTART IDENTITY;`
            const result = await conn.query(query)
            conn.release()
        } catch (err) {}
    })
})

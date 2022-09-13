import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
    ENV,
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN,
} = process.env

let client = new Pool()
if (ENV === 'dev') {
    client = new Pool({
        host: POSTGRES_HOST,
        port: Number(POSTGRES_PORT),
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
} else {
    client = new Pool({
        host: POSTGRES_HOST,
        port: Number(POSTGRES_PORT),
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}
export default client

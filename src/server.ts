import express from 'express'
import userRoutes from './routes/userRoutes'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.get('/', (_req, res) => {
    res.send('Home Page..')
})

userRoutes(app)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

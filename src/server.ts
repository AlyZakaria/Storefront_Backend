import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'
import orderRoutes from './routes/orderRoutes'

const app = express()
const port = 3000

app.get('/', (_req, res) => {
    res.send('Home Page..')
})

userRoutes(app)
productRoutes(app)
orderRoutes(app)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

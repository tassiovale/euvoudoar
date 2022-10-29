import dotenv from 'dotenv'
import express from 'express'
import _ from 'lodash'
import userRoutes from './src/routes/users/index.js'

dotenv.config()
const app = express()
app.use(express.json())

app.use(userRoutes)

const port = process.env.SERVER_PORT
app.listen(port, () => {
  console.log(`euvoudoar escutando na porta ${port}`)
})
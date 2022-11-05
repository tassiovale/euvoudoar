import express from 'express'
import userRoutes from './src/routes/users/index.js'

const app = express()

app.use(express.json())
app.use(userRoutes)

export { app }
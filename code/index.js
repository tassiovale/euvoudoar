import dotenv from 'dotenv'
import express from 'express'

dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.send('API euvoudoar')
})

const port = process.env.SERVER_PORT
app.listen(port, () => {
  console.log(`euvoudoar escutando na porta ${port}`)
})
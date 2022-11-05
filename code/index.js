import dotenv from 'dotenv'
import _ from 'lodash'
import { app } from './app.js'

dotenv.config()

const port = process.env.SERVER_PORT
app.listen(port, () => {
  console.log(`euvoudoar escutando na porta ${port}`)
})
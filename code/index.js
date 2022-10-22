import dotenv from 'dotenv'
import express from 'express'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { HTTP_STATUS_CREATED, HTTP_STATUS_NOT_FOUND } from './src/constants/http_status_codes.js'

dotenv.config()
const app = express()
app.use(express.json())

const users = []

app.post('/users', (req, res) => {
  const { name, email } = req.body
  const user = {
    id: uuidv4(),
    name,
    email
  }
  users.push(user)
  res.status(HTTP_STATUS_CREATED).send(user)
})

app.get('/users', (req, res) => {
  if (_.isEmpty(req.query)) {
    res.send(users)
  } else {
    const filteredUsers = _.filter(users, req.query)
    res.send(filteredUsers)
  }
})

app.put('/users/:id', (req, res) => {
  const { id } = req.params
  const index = _.findIndex(users, { id })
  if (index > -1) {
    const { name, email } = req.body
    users[index] = { id, name, email }
    res.send(users[index])
  } else {
    res.status(HTTP_STATUS_NOT_FOUND).send()
  }
})

app.patch('/users/:id', (req, res) => {
  const { id } = req.params
  const index = _.findIndex(users, { id })
  if (index > -1) {
    const { name, email } = req.body
    if (name) {
      users[index] = { ...users[index], name }
    }
    if (email) {
      users[index] = { ...users[index], email }
    }
    res.send(users[index])
  } else {
    res.status(HTTP_STATUS_NOT_FOUND).send()
  }
})

app.delete('/users/:id', (req, res) => {
  const { id } = req.params
  const elements = _.remove(users, { id })
  res.send(elements)
})

const port = process.env.SERVER_PORT
app.listen(port, () => {
  console.log(`euvoudoar escutando na porta ${port}`)
})
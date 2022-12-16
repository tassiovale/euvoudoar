import _ from 'lodash'
import express from 'express'

import {searchUser} from "../../controller/users/search.js"

const router = express.Router()

router.get('/users', searchUser)

export { router as searchRouter }
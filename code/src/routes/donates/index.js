import { createRouter } from './create.js'
import { searchPagedRouter } from './searchPaged.js'
import { findDonateByIdRouter } from './findByid.js'
import { deleteRouter } from './delete.js'

const routes = [
    createRouter,
    searchPagedRouter,
    findDonateByIdRouter,
    deleteRouter
]

export default routes
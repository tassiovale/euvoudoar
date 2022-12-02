import { createRouter } from './create.js'
import { searchPagedRouter } from './searchPaged.js'
import { findDonateByIdRouter } from './findByid.js'

const routes = [
    createRouter,
    searchPagedRouter,
    findDonateByIdRouter,
]

export default routes
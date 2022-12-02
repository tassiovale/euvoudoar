import { createRouter } from './create.js'
import { searchPagedRouter } from './searchPaged.js'
import { deleteRouter } from './delete.js'

const routes = [
    createRouter,
    searchPagedRouter
]

export default routes
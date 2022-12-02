import { createRouter } from './create.js'
import { findById } from './findById.js'
import { updateRouter } from './update.js';

const routes = [
    createRouter,
    findById,
    updateRouter
]

export default routes
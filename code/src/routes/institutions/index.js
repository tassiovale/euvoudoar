import { createRouter } from './create.js'
import { findById } from './findById.js'
import { updateRouter } from './update.js';
import { deleteRouter } from './delete.js';

const routes = [
    createRouter,
    findById,
    updateRouter,
    deleteRouter
]

export default routes
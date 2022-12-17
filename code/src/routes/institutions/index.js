import { createRouter } from './create.js'
import { find } from './find.js'
import { updateRouter } from './update.js';
import { deleteRouter } from './delete.js';

const routes = [
    createRouter,
    find,
    updateRouter,
    deleteRouter
]

export default routes
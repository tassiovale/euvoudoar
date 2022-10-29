import { deleteRouter } from './delete.js'
import { partialUpdateRouter } from './partialUpdate.js'
import { searchRouter } from './search.js'
import { signupRouter } from './signup.js'
import { updateRouter } from './update.js'

const routes = [
    signupRouter,
    searchRouter,
    updateRouter,
    partialUpdateRouter,
    deleteRouter
]

export default routes
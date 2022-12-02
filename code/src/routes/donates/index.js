import { createRouter } from './create.js'
import { searchPagedRouter } from './searchPaged.js'
<<<<<<< HEAD
import { findDonateByIdRouter } from './findByid.js'
=======
import { deleteRouter } from './delete.js'
>>>>>>> 709938da75e37aad1e92f125bbf48f71e6de6810

const routes = [
    createRouter,
    searchPagedRouter,
    findDonateByIdRouter,
]

export default routes
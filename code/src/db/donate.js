import { getDatabaseClientInstance } from './clientInstance.js'

const databaseClientInstance = getDatabaseClientInstance()
const defaultPageSize = parseInt(process.env.DEFAULT_PAGE_SIZE)
const defaultPageNumber = parseInt(process.env.DEFAULT_PAGE_NUMBER)

const createDonate = async (donate) => {
    const createdDonate = await databaseClientInstance.donate.create(
        {
            data: donate
        }
    )
    return createdDonate
}
export { 
    createDonate
}
import { getDatabaseClientInstance } from './clientInstance.js'

const databaseClientInstance = getDatabaseClientInstance()
const defaultPageSize = parseInt(process.env.DEFAULT_PAGE_SIZE)
const defaultPageNumber = parseInt(process.env.DEFAULT_PAGE_NUMBER)

const createUser = async (user) => {
    const createdUser = await databaseClientInstance.user.create(
        {
            data: user
        }
    )
    return createdUser
}
const deleteUser = async (id) => {
    return databaseClientInstance.user.delete({
        where: {
          id,
        }
    })
}
const findUserById = async (id) => {
    return databaseClientInstance.user.findUnique({
        where: {
            id
        }
      })
}
const updateUser = async(user) => {
    return await prisma.user.update({
        where: {
          id: user.id,
        },
        data: user,
      })
}

const searchUsers = async (where) => {
    const { page, limit } = where
    const take = parseInt(limit) || defaultPageSize
    const skip = parseInt(page || defaultPageNumber) * take
    const users = await databaseClientInstance.user.findMany(
        { 
            where: {
                name: {
                    contains: where.name
                },
                email: {
                    contains: where.email
                }
            },
            orderBy: [
                {
                    name: 'asc',
                }
            ],
            skip,
            take
        }
    )
    return users
}

export { 
    createUser,
    searchUsers,
    deleteUser,
    findUserById,
    updateUser
}
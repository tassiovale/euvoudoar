import { getSkipValueFromQuery, getTakeValueFromQuery } from '../helpers/paginationData.js'
import { getDatabaseClientInstance } from './clientInstance.js'

const databaseClientInstance = getDatabaseClientInstance()

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
            skip: getSkipValueFromQuery(where),
            take: getTakeValueFromQuery(where)
        }
    )
    return users
}

const searchUserByEmail = async (email) => {
    const user = await databaseClientInstance.user.findUinique(
        {
            where: {
                email
            }
        }
    )
    return user
    }
export { 
    createUser,
    searchUsers,
    searchUserByEmail,
    deleteUser,
    findUserById,
    updateUser
}
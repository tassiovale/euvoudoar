import { getDatabaseClientInstance } from './clientInstance.js'

const databaseClientInstance = getDatabaseClientInstance()

const findImageByInstitutionId = async (institutionId) => {
    return databaseClientInstance.image.findMany({
        where: {
            institutionId
        }
    })
}

export {
    findImageByInstitutionId
}
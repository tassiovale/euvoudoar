import { getDatabaseClientInstance } from './clientInstance.js'

const databaseClientInstance = getDatabaseClientInstance()

const findImageByInstitutionId = async (institutionId) => {
    return databaseClientInstance.image.findMany({
        where: {
            institutionId
        }
    })
}

const deleteImageById = async (imageId) => {
    return await databaseClientInstance.image.delete({
        where: { id: imageId }
    })
}

export {
    findImageByInstitutionId,
    deleteImageById
}
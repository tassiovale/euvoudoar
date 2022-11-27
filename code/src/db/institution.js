import { getDatabaseClientInstance } from './clientInstance.js'

const databaseClientInstance = getDatabaseClientInstance()

const createInstitution = async (institution) => {
    return databaseClientInstance.institution.create(
        {
            data: institution
        }
    )
}

const findInstitutionByCNPJ = async (cnpj) => {

    return databaseClientInstance.institution.findUnique({
        where: {
            cnpj
        }
    })
}

const findInstitutionById = async (id) => {
    return databaseClientInstance.institution.findUnique({
        where: { id }
    })
}

const deleteInstitutionById = async (id) => {
    return databaseClientInstance.institution.delete({
        where: { id }
    })
}

const updateInstitutionById = async(institution, id) => {
    return await databaseClientInstance.institution.update({
        where: { id },
        data: institution
    })
}

export {
    createInstitution,
    findInstitutionByCNPJ,
    findInstitutionById,
    deleteInstitutionById,
    updateInstitutionById
}
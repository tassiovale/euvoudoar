import { getDatabaseClientInstance } from './clientInstance.js'

const databaseClientInstance = getDatabaseClientInstance()

const createInstitution = async (institution) => {
    return await databaseClientInstance.institution.create(
        {
            data: institution
        }
    )
}

const findInsitutionByCNPJ = async(cnpj) => {

    return databaseClientInstance.institution.findUnique({
        where: {
          cnpj
        }
      })
}
export { 
    createInstitution,
    findInsitutionByCNPJ
}
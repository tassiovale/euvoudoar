import { getDatabaseClientInstance } from './clientInstance.js'

const databaseClientInstance = getDatabaseClientInstance()

const findPaymentGatewayByInstitutionId = async (institutionId) => {
    return databaseClientInstance.paymentGateway.findUnique({
        where: {
            institutionId
        }
    })
}

export {
    findPaymentGatewayByInstitutionId
}
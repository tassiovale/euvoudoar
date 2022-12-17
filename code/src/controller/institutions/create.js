import { HTTP_STATUS_CONFLIT, HTTP_STATUS_UNAUTHORIZED, HTTP_STATUS_CREATED, HTTP_STATUS_SERVER_ERROR } from '../../constants/httpStatusCodes.js'
import { getLoggedUser } from '../../helpers/authentication.js'
import { createInstitution, findInstitutionByCNPJ } from '../../db/institution.js'
import { ADMIN } from '../../constants/roles.js'

const createInstitutionController = async (req, res) => {
    const user = getLoggedUser(req)

    if (!user.role || user.role != ADMIN) {
        var resp = { ...req.body }
        resp.error = "Você não tem permissões necessárias para fazer esta operação."
        res.status(HTTP_STATUS_UNAUTHORIZED).send()
    } else {

        const institutionAlready = await findInstitutionByCNPJ(req.body.cnpj)

        if (institutionAlready != null) {
            var resp = { ...req.body }
            resp.error = "Esta instituição já existe."
            res.status(HTTP_STATUS_CONFLIT).send(resp)
        } else {

            var images = []

            for (var i = 0; i < req.body.images.length; i++) {
                images.push({
                    url: req.body.images[i]
                })
            }

            var institution = {
                name: req.body.name,
                cnpj: req.body.cnpj,
                paymentGateway: {
                    create: req.body.paymentGateway
                },
                description: req.body.description,
                images: {
                    create: images
                },
                createdBy: {
                    connect: { id: user.id }
                },
                updatedBy: {
                    connect: { id: user.id }
                }
            }

            createInstitution(institution).then( async (result) => {
                res.status(HTTP_STATUS_CREATED).send(result)
            }).catch( async (error) => {
                res.status(HTTP_STATUS_SERVER_ERROR).send(error)
            })            

        }

    }

}

export { createInstitutionController }
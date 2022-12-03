import express from 'express'
import { body } from 'express-validator'
import { HTTP_STATUS_CONFLIT, HTTP_STATUS_UNAUTHORIZED, HTTP_STATUS_CREATED } from '../../constants/httpStatusCodes.js'
import { getLoggedUser } from '../../helpers/authentication.js'
import { createInstitution, findInstitutionByCNPJ } from '../../db/institution.js'
import { validateRequest } from '../../middlewares/validateRequest.js'
import { ADMIN } from '../../constants/roles.js'
import { protectedRoute } from '../../middlewares/auth.js'

const router = express.Router()

router.post(
    '/',
    [
        body('name')
            .notEmpty()
            .withMessage('Você deve fornecer o nome da Instituição.'),
        body('cnpj')
            .notEmpty()
            .withMessage('Forneça o cnpj'),
        body('images')
            .notEmpty()
            .withMessage('Adicione o link de pelo menos uma imagem da instituição.')
    ],
    protectedRoute,
    validateRequest,
    async (req, res) => {
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

                const institutionCreated = await createInstitution(institution)

                res.status(HTTP_STATUS_CREATED).send(institutionCreated)

            }

        }

    }
)

export { router as createRouter }
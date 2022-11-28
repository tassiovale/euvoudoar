import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../../middlewares/validateRequest.js'
import { findUserById } from '../../db/user.js';
import { findInstitutionById, updateInstitutionById } from '../../db/institution.js';
import { deleteImageById } from '../../db/image.js';
import { HTTP_STATUS_OK } from '../../constants/httpStatusCodes.js';

const router = express.Router();

router.put(
    '/:institutionId',
    [   
        body('name')
            .notEmpty()
            .withMessage('Você deve fornecer o nome da Instituição.'),
        body('cnpj')
            .notEmpty()
            .withMessage('Forneça o cnpj'),
        body('images')
            .notEmpty()
            .withMessage('Adicione o link de pelo menos uma imagem da instituição.'),
        param('institutionId')
            .notEmpty()
    ],
    validateRequest,
    async (req, res) => {
        const user = await findUserById(req.userId);

        if (user.role == null || user.role != ADMIN) {
            var response = { 
                ...req.body,
                error: 'Você não tem permissões necessárias para fazer esta operação.'
            }
            
            return res.status(HTTP_STATUS_UNAUTHORIZED).send(response);
        }

        const { institutionId } = req.params;
        const institution = await findInstitutionById(institutionId);

        if (!institution) {
            var response = { 
                ...req.body,
                error: 'Você não pode fazer esta operação.'
            }
            
            return res.status(HTTP_STATUS_UNAUTHORIZED).send(response);
        }

        if (!institution.images) {
            institution.images.array.forEach(image => {
                deleteImageById(image.id);
            });
        }

        const { name, cnpj, paymentGateway, description, images } = req.body;

        const updatedInstitution = await updateInstitutionById(
            {
                name,
                cnpj,
                description,
                images: {
                    create: images,
                },
                paymentGateway: {
                    create: paymentGateway,
                },
                updatedBy: {
                    connect: { id: req.userId }
                },
            },
            institutionId,
        );

        return res.status(HTTP_STATUS_OK).send(updatedInstitution)
    }
);

export { router as updateRouter };
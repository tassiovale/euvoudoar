import { ADMIN } from '../../constants/roles.js'
import { findInstitutionById, updateInstitutionById } from '../../db/institution.js';
import { deleteImageById, findImageByInstitutionId } from '../../db/image.js';
import { HTTP_STATUS_OK, HTTP_STATUS_UNAUTHORIZED, HTTP_STATUS_NOT_FOUND } from '../../constants/httpStatusCodes.js';
import { getLoggedUser } from '../../helpers/authentication.js'

const updateInstitutionController = async (req, res) => {
        const user = getLoggedUser(req)

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
            
            return res.status(HTTP_STATUS_NOT_FOUND).send(response);
        }

        const imagesForDelete = await findImageByInstitutionId(institutionId);

        if (imagesForDelete) {
            imagesForDelete.forEach(image => {
                deleteImageById(image.id);
            });
        }

        const { name, cnpj, description } = req.body;

        const images = [];

        if (req.body.images) {
            req.body.images.forEach((image) => {
                images.push({
                    url: image
                })
            })
        }

        const updatedInstitution = await updateInstitutionById(
            {
                name,
                cnpj,
                description,
                images: {
                    create: images,
                },
                updatedBy: {
                    connect: { id: user.id }
                },
            },
            institutionId,
        );

        return res.status(HTTP_STATUS_OK).send(updatedInstitution)
    }

export { updateInstitutionController };
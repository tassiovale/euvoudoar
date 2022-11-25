import _ from 'lodash'
import express from 'express'
import { ADMIN } from "../../constants/roles.js";
import { findUserById } from "../../db/user.js";
import { findInsitutionById } from "../../db/institution.js";
import { HTTP_STATUS_NOT_FOUND, HTTP_STATUS_UNAUTHORIZED } from "../../constants/httpStatusCodes.js";
import { findDonationProfileById, findDonationProfilePages } from "../../db/donationProfile.js";

const router = express.Router()

// Se alguém souber de alguma forma que faça o prisma aceitar fazer a paginação com o metodo GET mim avise

router.post('/institutions/:institutionId/donation_profiles/page',
    async (req, res) => {

        const { page, limit } = req.query

        const institutionId = req.params.institutionId;

        const institution = await findInsitutionById(institutionId);

        if (!institution)
            return res
                .status(HTTP_STATUS_NOT_FOUND)
                .json({ error: "Instituição não encontrada" });

        const user = await findUserById(req.userId)

        if (user.role == null || user.role != ADMIN || institution.creatorId != user.id)
            return res.status(HTTP_STATUS_UNAUTHORIZED).json({
                error: "Você não tem permissões necessárias para fazer esta operação.",
            });


        const donationProfile = await findDonationProfilePages(page, limit);

        res.send(donationProfile)
    })

export default router
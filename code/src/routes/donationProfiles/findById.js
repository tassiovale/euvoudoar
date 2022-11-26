import _ from 'lodash'
import express from 'express'
import { ADMIN } from "../../constants/roles.js";
import { findUserById } from "../../db/user.js";
import { findInstitutionById } from "../../db/institution.js";
import { HTTP_STATUS_NOT_FOUND, HTTP_STATUS_UNAUTHORIZED } from "../../constants/httpStatusCodes.js";
import { findDonationProfileById } from "../../db/donationProfile.js";

const router = express.Router()

router.get('/institutions/:institutionId/donation_profiles/:donationProfilesId',
    async (req, res) => {

        const institutionId = req.params.institutionId;
        const donationProfilesId = req.params.donationProfilesId;
        const institution = await findInstitutionById(institutionId);

        if (!institution)
            return res
                .status(HTTP_STATUS_NOT_FOUND)
                .json({ error: "Instituição não encontrada" });

        const user = await findUserById(req.userId)

        if (user.role == null || user.role != ADMIN || institution.creatorId != user.id)
            return res.status(HTTP_STATUS_UNAUTHORIZED).json({
                error: "Você não tem permissões necessárias para fazer esta operação.",
            });


        const donationProfile = await findDonationProfileById(donationProfilesId);

        res.send(donationProfile)
    })

export default router
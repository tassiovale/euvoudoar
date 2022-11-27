import _ from 'lodash'
import express from 'express'
import { deleteDonationProfile, findDonationProfileById } from '../../db/donationProfile.js'
import { findUserById } from '../../db/user.js'

const router = express.Router()

router.delete('/institutions/:institutionId/donation_profiles/:donationProfilesId', async (req, res) => {
    
    const institutionId = req.params.institutionId;
        const donationProfilesId = req.params.donationProfilesId;
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

    const donationProfile = await findDonationProfileById(donationProfilesId)

    if (typeof donationProfile == undefined || donationProfile == null){
        res.send([])
    }else{
        await deletedonationProfile(donationProfilesId)
        res.send([req.params])
    }
    
})

export { router as deleteRouter }
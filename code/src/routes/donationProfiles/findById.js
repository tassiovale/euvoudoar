import _ from "lodash";
import express from "express";
import { ADMIN } from "../../constants/roles.js";
import { findUserById } from "../../db/user.js";
import { findInstitutionById } from "../../db/institution.js";
import {
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_UNAUTHORIZED,
} from "../../constants/httpStatusCodes.js";
import { findDonationProfileById } from "../../db/donationProfile.js";
import { getLoggedUser } from "../../helpers/authentication.js";

const router = express.Router();

router.get(
  "/institutions/:institutionId/donation_profiles/:donationProfilesId",
  async (req, res) => {
    const institutionId = req.params.institutionId;
    const donationProfilesId = req.params.donationProfilesId;
    const institution = await findInstitutionById(institutionId);

    if (!institution)
      return res
        .status(HTTP_STATUS_NOT_FOUND)
        .json({ error: "Instituição não encontrada" });

    const user = getLoggedUser(req);

    if (!user.role || user.role != ADMIN) {
      var resp = { ...req.body };
      resp.error =
        "Você não tem permissões necessárias para fazer esta operação.";
      return res.status(HTTP_STATUS_UNAUTHORIZED).send();
    } else {
      const donationProfile = await findDonationProfileById(donationProfilesId);

      return res.send(donationProfile);
    }
  }
);

export default router;

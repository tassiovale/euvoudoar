import _ from "lodash";
import express from "express";
import { ADMIN } from "../../constants/roles.js";
import { findUserById } from "../../db/user.js";
import { findInstitutionById } from "../../db/institution.js";
import {
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_UNAUTHORIZED,
} from "../../constants/httpStatusCodes.js";
import {
  findDonationProfileById,
  findDonationProfilePages,
} from "../../db/donationProfile.js";
import { getLoggedUser } from "../../helpers/authentication.js";

const router = express.Router();

// Se alguém souber de alguma forma que faça o prisma aceitar fazer a paginação com o metodo GET mim avise

router.get(
  "/institutions/:institutionId/donation_profiles",
  async (req, res) => {
    const { page, limit, keyword } = req.query;

    const institutionId = req.params.institutionId;

    const institution = await findInstitutionById(institutionId);

    if (!institution) {
      return res
        .status(HTTP_STATUS_NOT_FOUND)
        .json({ error: "Instituição não encontrada" });
    }

    const user = getLoggedUser(req);

    if (!user.role || user.role != ADMIN) {
      var resp = { ...req.body };
      resp.error =
        "Você não tem permissões necessárias para fazer esta operação.";
      return res.status(HTTP_STATUS_UNAUTHORIZED).send();
    } else {
      const donationProfile = await findDonationProfilePages(
        page,
        limit,
        keyword
      );

      return res.send(donationProfile);
    }
  }
);

export default router;

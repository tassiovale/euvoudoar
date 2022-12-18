import express from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { ADMIN } from "../../constants/roles.js";
import { findUserById } from "../../db/user.js";
import { findInstitutionById } from "../../db/institution.js";
import {
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_UNAUTHORIZED,
} from "../../constants/httpStatusCodes.js";
import {
  createDonationProfile,
  updateDonationProfile,
} from "../../db/donationProfile.js";
import { getLoggedUser } from "../../helpers/authentication.js";

const router = express.Router();
const URL = "/institutions/:institutionId/donation_profiles";

router.put(
  URL + "/:donationProfilesId",
  [
    body("name")
      .notEmpty()
      .withMessage("Você deve fornecer o nome do perfil de doação."),
    body("recurrenceExpirationDate")
      .notEmpty()
      .withMessage("Informe a data de expiração do perfil de doação."),
  ],
  validateRequest,
  async (req, res) => {
    const { name, recurrence } = req.body;

    const recurrenceExpirationDate = new Date(
      req.body.recurrenceExpirationDate
    );

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
      const donationProfile = await updateDonationProfile(
        {
          name,
          institution: {
            connect: { id: institution.id },
          },
          recurrence,
          recurrenceExpirationDate,
          createdBy: {
            connect: { id: user.id },
          },
          updatedBy: {
            connect: { id: user.id },
          },
        },
        donationProfilesId
      );

      return res.json(donationProfile);
    }
  }
);

export default router;

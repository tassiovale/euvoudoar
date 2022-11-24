import express from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { ADMIN } from "../../constants/roles.js";
import { findUserById } from "../../db/user.js";
import { findInsitutionById } from "../../db/institution.js";
import { HTTP_STATUS_NOT_FOUND } from "../../constants/httpStatusCodes.js";
import { createDonationProfile } from "../../db/donationProfile.js";

const router = express.Router();

router.post(
  "/institutions/:institutionId/donation_profiles",
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

    const recurrenceExpirationDate = new Date(req.body.recurrenceExpirationDate)

    const institutionId = req.params.institutionId;
    const institution = await findInsitutionById(institutionId);

    if (!institution)
      return res
        .status(HTTP_STATUS_NOT_FOUND)
        .json({ error: "Instituição não encontrada" });

    const user = await findUserById(req.userId);

    if (user.role == null || user.role != ADMIN)
      return res.status(HTTP_STATUS_UNAUTHORIZED).json({
        error: "Você não tem permissões necessárias para fazer esta operação.",
      });

    const donationProfile = await createDonationProfile({
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
    });

    return res.json(donationProfile);
  }
);

export default router

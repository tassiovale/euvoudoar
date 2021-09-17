import express, { Request, Response } from "express";
import { Donation } from "../models/donation";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.get(
  "/api/donations",
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const existingDonations = await Donation.find({
      userId: req.currentUser!.id,
    });

    res.status(200).send(existingDonations);
  }
);

export { router as searchRouter };

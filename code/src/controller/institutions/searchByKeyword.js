import express from "express";
import {
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_OK,
} from "../../constants/httpStatusCodes.js";
import { searchInstitutionByKeyword } from "../../db/institution.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const institutions = await searchInstitutionByKeyword(req.query);

  if (!institutions) {
    return res
      .status(HTTP_STATUS_NOT_FOUND)
      .json({ message: "Institution not found" });
  }

  for (let institution of institutions) {
    institution.images = institution.images.map((image) => image.url);
  }

  return res.status(HTTP_STATUS_OK).json(institutions);
});

export { router as searchInstitutionController };

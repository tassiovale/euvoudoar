import express from "express";
import { searchInstitutionController } from "../../controller/institutions/searchByKeyword.js";

const router = express.Router();

router.get("/", searchInstitutionController);

export { router as searchByKeyword };

import express from 'express'
import { findInstitutionByIdController } from "../../controller/institutions/find.js"

const router = express.Router()

router.get('/:id', findInstitutionByIdController)

export { router as find }
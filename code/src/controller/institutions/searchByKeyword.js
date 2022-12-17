import {
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_OK,
} from "../../constants/httpStatusCodes.js";
import { searchInstitutionByKeyword } from "../../db/institution.js";


const searchInstitutionController = async (req, res) => {
  const institutions = await searchInstitutionByKeyword(req.query);
  if (institutions.length === 0) {
    return res
      .status(HTTP_STATUS_NO_CONTENT)
      .json({ message: "Institution not found" });
  }

  for (let institution of institutions) {
    institution.images = institution.images.map((image) => image.url);
  }

  return res.status(HTTP_STATUS_OK).json(institutions);
}

export { searchInstitutionController };

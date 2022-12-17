import {
  getSkipValueFromQuery,
  getTakeValueFromQuery,
} from "../helpers/paginationData.js";
import { getDatabaseClientInstance } from "./clientInstance.js";

const databaseClientInstance = getDatabaseClientInstance();

const createInstitution = async (institution) => {
  return databaseClientInstance.institution.create({
    data: institution,
  });
};

const findInstitutionByCNPJ = async (cnpj) => {
  return databaseClientInstance.institution.findUnique({
    where: {
      cnpj,
    },
  });
};

const findInstitutionById = async (id) => {
  return databaseClientInstance.institution.findUnique({
    where: { id },
  });
};

const deleteInstitutionById = async (id) => {
  return databaseClientInstance.institution.delete({
    where: { id },
  });
};

const updateInstitutionById = async (institution, id) => {
  return await databaseClientInstance.institution.update({
    where: { id },
    data: institution,
  });
};

const searchInstitutionByKeyword = async (where) => {
  return databaseClientInstance.institution.findMany({
    where: {
      OR: [
        {
          name: {
            contains: where.keyword,
          },
        },
        {
          cnpj: {
            contains: where.keyword,
          },
        },
        {
          createdBy: {
            name: {
              contains: where.keyword,
            },
          },
        },
        {
          updatedBy: {
            name: {
              contains: where.keyword,
            },
          },
        },
      ],
    },
    orderBy: [
      {
        name: "asc",
      },
    ],
    skip: getSkipValueFromQuery(where),
    take: getTakeValueFromQuery(where),
    select: {
      id: true,
      name: true,
      cnpj: true,
      paymentGateway: {
        select: {
          type: true,
          apiKey: true,
        },
      },
      description: true,
      images: {
        select: {
          url: true,
        },
      },
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      createdBy: {
        select: {
          id: true,
          name: true,
        },
      },
      updatedBy: {
        select: {
          id: true,
          name: true,
        },
      },
      deletedBy: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export {
  createInstitution,
  findInstitutionByCNPJ,
  findInstitutionById,
  deleteInstitutionById,
  updateInstitutionById,
  searchInstitutionByKeyword,
};

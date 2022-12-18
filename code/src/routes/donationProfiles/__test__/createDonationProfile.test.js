import request from "supertest";

import { app } from "../../../../app.js";

import { createUser, deleteUser } from "../../../db/user.js";
import { createInstitution } from "../../../db/institution";
import { deleteInstitutionById } from "../../../db/institution.js";
import { TEST_INFO, generateEmail } from "../../../__test__/testInfo.js";
import { makeToken } from "../../../helpers/makeToken.js";
import { HTTP_STATUS_OK } from "../../../constants/httpStatusCodes.js";

describe("Donation Profiles", () => {
  beforeAll(async () => {
    TEST_INFO.testerAdminUser.email = generateEmail();
    TEST_INFO.testerAdminUser = await createUser(TEST_INFO.testerAdminUser);
    TEST_INFO.testerAdminUser.token = makeToken(TEST_INFO.testerAdminUser);

    TEST_INFO.testerUser = await createUser(TEST_INFO.testerUser);
    TEST_INFO.testerUser.token = makeToken(TEST_INFO.testerUser);

    const images = [];

    TEST_INFO.institution.images.forEach((image) => {
      images.push({
        url: image,
      });
    });

    TEST_INFO.institution = await createInstitution({
      name: TEST_INFO.institution.name,
      cnpj: TEST_INFO.institution.cnpj,
      paymentGateway: {
        create: TEST_INFO.institution.paymentGateway,
      },
      description: TEST_INFO.institution.description,
      images: {
        create: images,
      },
      createdBy: {
        connect: { id: TEST_INFO.testerAdminUser.id },
      },
      updatedBy: {
        connect: { id: TEST_INFO.testerAdminUser.id },
      },
    });
  });

  afterAll(async () => {
    await deleteInstitutionById(TEST_INFO.institution.id);
    await deleteUser(TEST_INFO.testerAdminUser.id);
    await deleteUser(TEST_INFO.testerUser.id);
  });

  test("Should create donation profile.", async () => {
    const exampleDonationProfile = {
      name: "Contribuição mensal",
      institutionId: "a5a78e02-a9ed-49c4-b41d-705a0c8c79ff",
      recurrence: "WEEKLY",
      recurrenceExpirationDate: "2022-11-28 14:32:00",
    };

    await request(app)
      .post(`/institutions/${TEST_INFO.institution.id}/donation_profiles`)
      .set("x-access-token", TEST_INFO.testerAdminUser.token)
      .send(exampleDonationProfile)
      .then((res) => {
        expect(res.status).toBe(HTTP_STATUS_OK);
        expect(res.body.id).not.toBeFalsy();
      });
  });
});

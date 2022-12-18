import request from "supertest";
import { createDonationProfile } from "../../../db/donationProfile.js";
import { app } from "../../../../app.js";

import { createUser, deleteUser } from "../../../db/user.js";
import { createInstitution } from "../../../db/institution";
import { deleteInstitutionById } from "../../../db/institution.js";
import { TEST_INFO, generateEmail } from "../../../__test__/testInfo.js";
import { makeToken } from "../../../helpers/makeToken.js";

describe("Donation Profiles", () => {
  beforeAll(async () => {
    TEST_INFO.testerAdminUser.email = generateEmail();
    TEST_INFO.testerAdminUser = await createUser(TEST_INFO.testerAdminUser);
    TEST_INFO.testerAdminUser.token = makeToken(TEST_INFO.testerAdminUser);

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
  });

  test("Should update donation profile.", async () => {
    const exampleDonationProfile = {
      name: "Contribuição Diaria",
      recurrence: "WEEKLY",
      recurrenceExpirationDate: new Date("2022-11-28 14:32:00"),
    };

    const donationProfile = await createDonationProfile({
      name: "Contribuição mensal",
      institution: {
        connect: { id: TEST_INFO.institution.id },
      },
      recurrence: "WEEKLY",
      recurrenceExpirationDate: new Date("2022-11-28 14:32:00"),
      createdBy: {
        connect: { id: TEST_INFO.testerAdminUser.id },
      },
      updatedBy: {
        connect: { id: TEST_INFO.testerAdminUser.id },
      },
    });

    await request(app)
      .put(
        `/institutions/${TEST_INFO.institution.id}/donation_profiles/${donationProfile.id}`
      )
      .set("x-access-token", TEST_INFO.testerAdminUser.token)
      .send(exampleDonationProfile)
      .then((res) => {
        const { id, name, recurrence } = res.body;

        expect(res.status).toBe(200);
        expect(id).not.toBeFalsy();
        expect(name).toBe(exampleDonationProfile.name);
        expect(recurrence).toBe(exampleDonationProfile.recurrence);
      });
  });
});

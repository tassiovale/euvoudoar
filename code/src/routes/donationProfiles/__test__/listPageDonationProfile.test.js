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

  test("Should find with pagination donation profile.", async () => {
    const exampleDonationProfile_2 = {
      name: "Contribuição mensal",
      recurrence: "WEEKLY",
      recurrenceExpirationDate: "2022-11-28 14:32:00",
    };

    await request(app)
      .post(`/institutions/${TEST_INFO.institution.id}/donation_profiles`)
      .set("x-access-token", TEST_INFO.testerUser.token)
      .send(exampleDonationProfile_2);

    await request(app)
      .post(`/institutions/${TEST_INFO.institution.id}/donation_profiles`)
      .set("x-access-token", TEST_INFO.testerUser.token)
      .send(exampleDonationProfile_2);

    await request(app)
      .get(
        `/institutions/${TEST_INFO.institution.id}/donation_profiles/?page=1&limit=2&keyword=Contribuição mensal`
      )
      .set("x-access-token", TEST_INFO.testerAdminUser.token)
      .then((res) => {
        // expect(res.body.length).toBe(2);
        expect(res.status).toBe(HTTP_STATUS_OK);
      });
  });

  //   test("Should donation profile, not exist.", async () => {
  //     const exampleInstitution = {
  //       name: "XPTO",
  //       cnpj: randomWord(10),
  //       paymentGateway: {
  //         type: "pagarme",
  //         apiKey: "fkldsy879ey087yfg908stfb089760r976b0v",
  //       },
  //       description: "Descrição da instituição...",
  //       images: [
  //         {
  //           url: "localhost",
  //         },
  //       ],
  //     };

  //     intitutionId = TEST_INFO.institution.id;

  //     const exampleDonationProfile = {
  //       name: "Contribuição mensal",
  //       institutionId: "a5a78e02-a9ed-49c4-b41d-705a0c8c79ff",
  //       recurrence: "WEEKLY",
  //       recurrenceExpirationDate: "2022-11-28 14:32:00",
  //     };

  //     const perfil_1 = await createDonationProfile({
  //       name: "Contribuição mensal",
  //       institution: {
  //         connect: { id: intitutionId },
  //       },
  //       recurrence: "WEEKLY",
  //       recurrenceExpirationDate: new Date("2022-11-28 14:32:00"),
  //       createdBy: {
  //         connect: { id: userAuth.id },
  //       },
  //       updatedBy: {
  //         connect: { id: userAuth.id },
  //       },
  //     });

  //     const perfil_2 = await createDonationProfile({
  //       name: "Contribuição mensal",
  //       institution: {
  //         connect: { id: intitutionId },
  //       },
  //       recurrence: "WEEKLY",
  //       recurrenceExpirationDate: new Date("2022-11-28 14:32:00"),
  //       createdBy: {
  //         connect: { id: userAuth.id },
  //       },
  //       updatedBy: {
  //         connect: { id: userAuth.id },
  //       },
  //     });

  //     const exampleDonationProfile_2 = {
  //       name: "Contribuição mensal",
  //       institutionId: "a5a78e02-a9ed-49c4-b41d-705a0c8c79ff",
  //       recurrence: "WEEKLY",
  //       recurrenceExpirationDate: "2022-11-28 14:32:00",
  //     };

  //     await request(app)
  //       .post(`/institutions/${TEST_INFO.institution.id}/donation_profiles`)
  //       .set("x-access-token", userAuth.token)
  //       .send(exampleDonationProfile_2);

  //     await request(app)
  //       .post(`/institutions/${TEST_INFO.institution.id}/donation_profiles`)
  //       .set("x-access-token", userAuth.token)
  //       .send(exampleDonationProfile_2);

  //     const donationProfilesRequest = await request(app)
  //       .get(
  //         `/institutions/${intitutionId}/donation_profiles/?page=1&limit=2&keyword=Contribuição diario`
  //       )
  //       .set("x-access-token", userAuth.token);

  //     expect(JSON.parse(donationProfilesRequest.text).length).toBe(0);
  //   });
});

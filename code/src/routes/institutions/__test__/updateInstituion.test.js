import request from "supertest";
import { app } from "../../../../app.js";
import { createUser, deleteUser } from "../../../db/user.js";
import { createInstitution } from "../../../db/institution";
import { deleteInstitutionById } from "../../../db/institution.js";
import { TEST_INFO, generateEmail } from "../../../__test__/testInfo.js";
import { makeToken } from "../../../helpers/makeToken.js";
import { HTTP_STATUS_NOT_FOUND, HTTP_STATUS_OK, HTTP_STATUS_UNAUTHORIZED } from "../../../constants/httpStatusCodes.js";
import { ADMIN } from "../../../constants/roles.js";

describe("PUT /institutions/{id}", () => {
  beforeAll(async () => {
    TEST_INFO.testerAdminUser.email = generateEmail();
    TEST_INFO.testerAdminUser = await createUser(TEST_INFO.testerAdminUser);
    TEST_INFO.testerAdminUser.role = ADMIN;
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

  test("Expect status: 404 when institution not found.", async () => {
    await request(app)
      .put(`/institutions/4156848971`)
      .set("x-access-token", TEST_INFO.testerAdminUser.token)
      .send(TEST_INFO.institutionUpdated)
      .then((res) => {
        expect(res.status).toBe(HTTP_STATUS_NOT_FOUND);
      });
  });

  test("Expect status: 401 when the access token is not suficient.", async () => {
    await request(app)
      .put(`/institutions/${TEST_INFO.institution.id}`)
      .set(
        "x-access-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      )
      .send(TEST_INFO.institutionUpdated)
      .then((res) => {
        expect(res.status).toBe(HTTP_STATUS_UNAUTHORIZED);
      });
  });

  test("Expect status: 401 when the the user is not a admin.", async () => {
    await request(app)
      .put(`/institutions/${TEST_INFO.institution.id}`)
      .set("x-access-token", TEST_INFO.testerUser.token)
      .send(TEST_INFO.institutionUpdated)
      .then((res) => {
        expect(res.status).toBe(HTTP_STATUS_UNAUTHORIZED);
      });
  });

  test("Expect status: 200. Return the institution updated.", async () => {
    await request(app)
      .put(`/institutions/${TEST_INFO.institution.id}`)
      .set("x-access-token", TEST_INFO.testerAdminUser.token)
      .send(TEST_INFO.institutionUpdated)
      .then((res) => {
        const { id, name, cnpj, description } = res.body;

        expect(res.status).toBe(HTTP_STATUS_OK);
        expect(id).not.toBeFalsy();
        expect(name).toBe(TEST_INFO.institutionUpdated.name);
        expect(cnpj).toBe(TEST_INFO.institutionUpdated.cnpj);
        expect(description).toBe(TEST_INFO.institutionUpdated.description);
        expect(name).toBe(TEST_INFO.institutionUpdated.name);
      });
  });
});

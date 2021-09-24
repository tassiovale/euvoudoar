import request from "supertest";
import { app } from "../../app";

const mock_institution = {
  institutionName: "Igreja Nossa Senhora",
  description: "Dízimo",
  value: 300,
};

it("returns unauthorized with invalid cookie", async () => {
  return request(app).get("/api/donations").expect(401);
});

it("returns a 201 on donation with valid data", async () => {
  await request(app)
    .post("/api/donations")
    .set("Cookie", global.signin())
    .send(mock_institution)
    .expect(201);
  await request(app)
    .get("/api/donations")
    .set("Cookie", global.signin())
    .expect(200);
});

it("returns a 200 on donation by description with valid data", async () => {
  await request(app)
    .get("/api/donationsByDescription/:Dízimo")
    .set("Cookie", global.signin())
    .expect(200);
});

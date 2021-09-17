import request from "supertest";
import { app } from "../../app";

it("returns unauthorized with invalid cookie", async () => {
  return request(app).get("/api/donations").expect(401);
});

it("returns a 201 on donation with valid data", async () => {
  await request(app)
    .post("/api/donations")
    .set("Cookie", global.signin())
    .send({
      institutionName: "Igreja Nossa Senhora",
      description: "Dízimo",
      value: 300,
    })
    .expect(201);
  await request(app)
    .get("/api/donations")
    .set("Cookie", global.signin())
    .expect(200);
});

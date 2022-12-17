import { createRouter } from "./create.js";
import { find } from "./find.js";
import { updateRouter } from "./update.js";
import { deleteRouter } from "./delete.js";
import { searchByKeyword } from "./searchByKeyword.js";

const routes = [
  createRouter,
  find,
  updateRouter,
  deleteRouter,
  searchByKeyword,
];

export default routes;

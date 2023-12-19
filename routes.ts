import { Router } from "express";
import { scrappingController } from "./controllers/scrapping.controller";

const api = Router();

api.get("/scrapper", scrappingController);

export { api };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = require("express");
const scrapping_controller_1 = require("./controllers/scrapping.controller");
const api = (0, express_1.Router)();
exports.api = api;
api.get("/scrapper", scrapping_controller_1.scrappingController);
//# sourceMappingURL=routes.js.map
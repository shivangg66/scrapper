"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrappingController = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const fs_1 = require("fs");
function scrappingController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { pageNumber } = req.query;
            const response = yield fetchNewsData(pageNumber !== null && pageNumber !== void 0 ? pageNumber : "1");
            const header = `title,comment,group\n`;
            (0, fs_1.appendFileSync)(`yc_result.csv`, header);
            const data = (0, cheerio_1.load)(response.data);
            data(".athing").each((_, element) => {
                const title = data(element).find(".titleline").text().trim();
                const comments = parseInt(data(element)
                    .next()
                    .find(".subline")
                    .children("a")
                    .last()
                    .text()
                    .split(" ")[0]) || 0;
                console.log(comments);
                if (comments >= 0 && comments <= 100) {
                    (0, fs_1.appendFileSync)("yc_result.csv", `${title},${comments},0-100\n`);
                }
                else if (comments >= 101 && comments <= 200) {
                    (0, fs_1.appendFileSync)("yc_result.csv", `${title},${comments},0-100\n`);
                }
                else if (comments >= 201 && comments <= 300) {
                    (0, fs_1.appendFileSync)("yc_result.csv", `${title},${comments},0-100\n`);
                }
                else {
                    (0, fs_1.appendFileSync)("yc_result.csv", `${title},${comments},0-100\n`);
                }
            });
            res.status(200).json({ message: "Response created" }).send();
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: err }).send();
        }
    });
}
exports.scrappingController = scrappingController;
function fetchNewsData(pageNumber) {
    return axios_1.default.get(`https://news.ycombinator.com/?p=${pageNumber}`);
}
//# sourceMappingURL=scrapping.controller.js.map
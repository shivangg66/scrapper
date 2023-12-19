import { Request, Response } from "express";
import axios from "axios";
import { load } from "cheerio";
import { appendFileSync } from "fs";

export async function scrappingController(req: Request, res: Response) {
  try {
    const { pageNumber } = req.query as { pageNumber?: string };
    const response = await fetchNewsData(pageNumber ?? "1");
    const header = `title,comment,group\n`;
    appendFileSync(`yc_result.csv`, header);
    const data = load(response.data);

    data(".athing").each((_, element) => {
      const title = data(element).find(".titleline").text().trim();
      const comments =
        parseInt(
          data(element)
            .next()
            .find(".subline")
            .children("a")
            .last()
            .text()
            .split(" ")[0]
        ) || 0;
      console.log(comments);
      if (comments >= 0 && comments <= 100) {
        appendFileSync("yc_result.csv", `${title},${comments},0-100\n`);
      } else if (comments >= 101 && comments <= 200) {
        appendFileSync("yc_result.csv", `${title},${comments},0-100\n`);
      } else if (comments >= 201 && comments <= 300) {
        appendFileSync("yc_result.csv", `${title},${comments},0-100\n`);
      } else {
        appendFileSync("yc_result.csv", `${title},${comments},0-100\n`);
      }
    });
    res.status(200).json({ message: "Response created" }).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err }).send();
  }
}

function fetchNewsData(pageNumber: string) {
  return axios.get(`https://news.ycombinator.com/?p=${pageNumber}`);
}

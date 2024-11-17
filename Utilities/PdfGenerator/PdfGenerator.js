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
exports.PdfGenerator = void 0;
class PdfGenerator {
    constructor() {
        console.log("Pdf gen");
        // this.generate();
    }
    generate() {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            page.setContent(`
    
      <div class="pdf">
        <h1>testowy h1</h1>  <h2 style="text-align:right;">testowy h2</h2>
      </div>


      <style>
      *{
        margin: 0;
        padding:0;
        box-sizing: border-box;
      }

      .opac{
        width: 210mm;
        // max-height: 297mm;
        height: 2297mm;
        width: 210mm;
      }
      .pdf{
        width: 210mm;
         max-height: 297mm;
        height: 297mm;
        border: 2px solid green;
      }

      </style>
      `);
            let s = yield page.pdf({
                path: "hn.pdf",
                format: "A4",
            });
            return s;
            // return await page.pdf({
            //   path: "hn.pdf",
            // });
        });
    }
    generate2(content) {
        return __awaiter(this, void 0, void 0, function* () {
            // let js = JSON.parse(content);
            console.log("---");
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            page.setContent(content);
            let s = yield page.pdf({
                path: "hn.pdf",
                format: "A4",
                printBackground: true,
            });
            return s;
            // return await page.pdf({
            //   path: "hn.pdf",
            // });
        });
    }
}
exports.PdfGenerator = PdfGenerator;
const puppeteer_1 = __importDefault(require("puppeteer"));
// import { PdfGenerator } from "./Utilities/PdfGenerator";
// const browser = await puppeteer.launch();
// const page = await browser.newPage();
// let ss = new PdfGenerator();
// page.setContent("<h1>testowy h1</h1>  <h2>testowy h2</h2>");
// await page.pdf({
//   path: "hn.pdf",
// });

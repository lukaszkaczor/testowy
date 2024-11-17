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
// src/index.js
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const PdfGenerator_1 = require("./Utilities/PdfGenerator/PdfGenerator");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// var cors = require('cors')
const invoice_item_router_1 = __importDefault(require("./routes/invoice-item.router"));
const invoice_router_1 = __importDefault(require("./routes/invoice.router"));
const contractor_router_1 = __importDefault(require("./routes/contractor.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/invoiceitems", invoice_item_router_1.default);
app.use("/invoice", invoice_router_1.default);
app.use("/contractor", contractor_router_1.default);
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.BIZNES_GOV_API;
const API_PATH = "https://dane.biznes.gov.pl/api/ceidg/v2/firmy?nip=";
// app.get("/", (req: Request, res: Response) => {
//   // let s = new PdfGenerator();
//   res.send("Express + TypeScript Servers");
// });
// app.get("/company/:nip", async (req, res) => {
//   const headers = { Authorization: `Bearer ${API_KEY}` };
//   console.log(req.params);
//   let companyData = await fetch(API_PATH + req.params.nip, { headers });
//   console.log(companyData);
//   return res.send(await companyData.json());
// });
app.get("/company/:nip", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headers = { Authorization: `Bearer ${API_KEY}` };
        let response = yield fetch(API_PATH + req.params.nip, { headers });
        if (!response.ok)
            return res.status(response.status).send(response);
        return res.send(yield response.json());
    }
    catch (_a) {
        console.log("error");
    }
}));
// app.get("/company/:nip", async (req, res) => {
//   const headers = { Authorization: `Bearer ${API_KEY}` };
//   console.log(req.params);
//   try {
//     let response = await fetch(API_PATH + req.params.nip, { headers });
//     console.log("try");
//     console.log(response);
//     // if (response.ok) console.log("ok");
//     // if (response.ok) return res.send(await )
//     if (!response.ok) {
//       console.log("responotok");
//     }
//     console.log("eeee");
//     return res.send(await response.json());
//   } catch (err) {
//     console.log("catch");
//     // console.log(err);
//     // res.status(response.status).send(response);
//   }
// });
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.body);
    console.log(req);
    let ssd = req.body.content;
    // let dd = JSON.parse(req.body);
    let ss = new PdfGenerator_1.PdfGenerator();
    // console.log(dd);
    let data = yield ss.generate();
    res.contentType("application/pdf");
    res.download("/Users/lukasz/Documents/Invoices/Backend/hn.pdf", "test.pdf", (err) => {
        console.log("Downloaded");
        if (err) {
            console.log(err);
        }
        // fs.unlink("/Users/lukasz/Documents/Invoices/Backend/hn.pdf", (err) => console.log(err));
        // console.log("Deleted");
    });
}));
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

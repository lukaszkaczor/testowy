"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contractor_controller_1 = require("../controllers/contractor.controller");
const contractorRouter = (0, express_1.Router)();
contractorRouter.get("/", contractor_controller_1.getAllContractors);
contractorRouter.get("/:id", contractor_controller_1.getContractor);
contractorRouter.post("/", contractor_controller_1.createContractor);
contractorRouter.put("/:id", contractor_controller_1.updateContractor);
contractorRouter.delete("/:id", contractor_controller_1.deleteContractor);
exports.default = contractorRouter;
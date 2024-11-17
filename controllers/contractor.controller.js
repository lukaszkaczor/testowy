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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContractor = exports.updateContractor = exports.createContractor = exports.getContractor = exports.getAllContractors = void 0;
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient().contractor;
const getAllContractors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contractors = yield client.findMany();
        res.status(200).json({ data: contractors });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllContractors = getAllContractors;
const getContractor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contractorId = req.params.id;
        const contractor = yield client.findUnique({
            where: { id: contractorId },
        });
        res.status(200).json({ data: contractor });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getContractor = getContractor;
const createContractor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contractorData = req.body;
        const contractor = yield client.create({ data: contractorData });
        res.status(201).json({ data: contractor });
    }
    catch (error) {
        console.error(error);
    }
});
exports.createContractor = createContractor;
const updateContractor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contractorId = req.params.id;
        const contractorData = req.body;
        const contractor = yield client.update({
            where: { id: contractorId },
            data: contractorData,
        });
        res.status(200).json({ data: contractor });
    }
    catch (error) {
        console.error(error);
    }
});
exports.updateContractor = updateContractor;
const deleteContractor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contractorId = req.params.id;
        const contractor = yield client.delete({ where: { id: contractorId } });
        res.status(200).json({ data: {} });
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteContractor = deleteContractor;

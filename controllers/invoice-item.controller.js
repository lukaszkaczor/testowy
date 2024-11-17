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
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItem = exports.getAllItems = void 0;
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient().invoiceItem;
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield client.findMany();
        res.status(200).json({ data: items });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllItems = getAllItems;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.id;
        const item = yield client.findUnique({
            where: { id: itemId },
        });
        res.status(200).json({ data: item });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getItem = getItem;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemData = req.body;
        const item = yield client.create({ data: itemData });
        res.status(201).json({ data: item });
    }
    catch (error) {
        console.error(error);
    }
});
exports.createItem = createItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.id;
        const itemData = req.body;
        const item = yield client.update({
            where: { id: itemId },
            data: itemData,
        });
        res.status(200).json({ data: item });
    }
    catch (error) {
        console.error(error);
    }
});
exports.updateItem = updateItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.id;
        const item = yield client.delete({ where: { id: itemId } });
        res.status(200).json({ data: {} });
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteItem = deleteItem;

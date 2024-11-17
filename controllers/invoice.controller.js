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
exports.deleteInvoice = exports.updateInvoice = exports.createInvoice = exports.getInvoice = exports.getAllInvoices = void 0;
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
const getAllInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoices = yield client.invoice.findMany();
        res.status(200).json({ data: invoices });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllInvoices = getAllInvoices;
const getInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoiceId = Number.parseInt(req.params.id);
        const invoice = yield client.invoice.findUnique({
            where: { id: invoiceId },
            include: {
                seller: true,
                buyer: true,
                items: true,
            },
        });
        res.status(200).json(invoice);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getInvoice = getInvoice;
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoiceData = req.body;
        console.log(req.body);
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        console.log(invoiceData);
        yield client.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            let inv = {};
            console.log(invoiceData.issueDate);
            inv.invoiceNumber = invoiceData.invoiceNumber;
            let invoice = yield client.invoice.create({
                data: {
                    invoiceNumber: invoiceData.invoiceNumber,
                    issueDate: new Date(invoiceData.issueDate),
                    saleDate: new Date(invoiceData.saleDate),
                    placeOfIssue: invoiceData.placeOfIssue,
                    total: invoiceData.total,
                    paymentType: invoiceData.paymentType,
                    paymentTerm: new Date(invoiceData.paymentTerm),
                    bankName: invoiceData.bankName,
                    bankAccount: invoiceData.bankAccount,
                    email: invoiceData.email,
                    phoneNumber: invoiceData.phoneNumber,
                    seller: {
                        create: invoiceData.seller,
                    },
                    buyer: {
                        create: invoiceData.buyer,
                    },
                    items: {
                        createMany: {
                            data: invoiceData.items,
                        },
                    },
                },
            });
            // await client.invoiceItem.createMany({ data: invoiceData.items });
            res.status(200).json(invoice);
        }));
        // const invoice = await client.invoice.create({ data: invoiceData });
        // res.status(201).json({ data: invoice });
    }
    catch (error) {
        console.error(error);
    }
});
exports.createInvoice = createInvoice;
const updateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoiceId = req.params.id;
        const invoiceData = req.body;
        invoiceData.issueDate = new Date(invoiceData.issueDate);
        invoiceData.saleDate = new Date(invoiceData.saleDate);
        invoiceData.paymentTerm = new Date(invoiceData.paymentTerm);
        console.log(invoiceData.items);
        const invoice = yield client.invoice.update({
            where: { id: parseInt(invoiceId) },
            data: {
                invoiceNumber: invoiceData.invoiceNumber,
                issueDate: new Date(invoiceData.issueDate),
                saleDate: new Date(invoiceData.saleDate),
                placeOfIssue: invoiceData.placeOfIssue,
                total: invoiceData.total,
                paymentType: invoiceData.paymentType,
                paymentTerm: new Date(invoiceData.paymentTerm),
                bankName: invoiceData.bankName,
                bankAccount: invoiceData.bankAccount,
                email: invoiceData.email,
                phoneNumber: invoiceData.phoneNumber,
                seller: {
                    update: {
                        where: { id: invoiceData.sellerId },
                        data: invoiceData.seller,
                    },
                },
                buyer: {
                    update: {
                        where: { id: invoiceData.buyerId },
                        data: invoiceData.buyer,
                    },
                },
                items: {
                    deleteMany: {},
                    createMany: {
                        data: invoiceData.items,
                    },
                },
            },
        });
        res.status(200).json({ data: invoice });
    }
    catch (error) {
        console.error(error);
    }
});
exports.updateInvoice = updateInvoice;
const deleteInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoiceId = req.params.id;
        const invoice = yield client.invoice.delete({ where: { id: invoiceId } });
        res.status(200).json({ data: {} });
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteInvoice = deleteInvoice;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../handlers/order"));
const body_parser_1 = __importDefault(require("body-parser"));
const verifyAuth_1 = __importDefault(require("../middlewares/verifyAuth"));
const verifyUserOrder_1 = __importDefault(require("../middlewares/verifyUserOrder"));
const orderHandle = new order_1.default();
const orderRoutes = (app) => {
    app.get('/orders', verifyAuth_1.default, orderHandle.index);
    app.get('/orders/:id', verifyAuth_1.default, orderHandle.show);
    app.delete('/orders/:id', orderHandle.delete);
    // verify user => to check that user_id in body is same in token
    app.post('/orders', body_parser_1.default.json(), verifyAuth_1.default, verifyUserOrder_1.default, orderHandle.create);
    // add product to order
    app.post('/orders/:id/products', body_parser_1.default.json(), verifyAuth_1.default, orderHandle.addProduct);
    app.get('/users/:user_id/orders', orderHandle.currentOrderByUser);
};
exports.default = orderRoutes;

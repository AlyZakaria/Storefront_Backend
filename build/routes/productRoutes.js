"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../handlers/product"));
const body_parser_1 = __importDefault(require("body-parser"));
const verifyAuth_1 = __importDefault(require("../middlewares/verifyAuth"));
const productHandle = new product_1.default();
const productRoutes = (app) => {
    app.get('/products', productHandle.index);
    app.get('/products/:id', productHandle.show);
    app.post('/products', body_parser_1.default.json(), verifyAuth_1.default, productHandle.create);
    app.post('/products/:category', body_parser_1.default.json(), verifyAuth_1.default, productHandle.getProductsByCategory);
    app.put('/products/:id', body_parser_1.default.json(), verifyAuth_1.default, productHandle.update);
    app.get('/top-products', productHandle.getTopProducts);
};
exports.default = productRoutes;

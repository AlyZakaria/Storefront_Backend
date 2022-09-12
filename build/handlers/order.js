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
const order_1 = __importDefault(require("../models/order"));
const order = new order_1.default();
class orderHandler {
    constructor() {
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getOrders = yield order.index();
                res.json(getOrders);
            }
            catch (e) {
                res.send('No Orders Found..');
            }
            finally {
                next();
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getOrder = yield order.show(Number(req.params.id));
                res.json(getOrder);
            }
            catch (e) {
                res.send('Order not Found..');
            }
            finally {
                next();
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedOrder = yield order.delete(Number(req.params.id));
                res.json(deletedOrder);
                next();
            }
            catch (e) {
                res.send('Order not Found..');
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const status = req.body.status;
                const user_id = Number(req.body.user_id);
                const newOrder = yield order.create(status, user_id);
                res.json(newOrder);
            }
            catch (e) {
                res.send('Can not create the Order');
            }
            finally {
                next();
            }
        });
        // add products to order
        this.addProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const order_id = Number(req.params.id);
                const product_id = Number(req.body.product_id);
                const quantity = Number(req.body.quantity);
                const addedProduct = yield order.addProduct(order_id, product_id, quantity);
                res.json(addedProduct);
            }
            catch (e) {
                res.send('Can not add the product to the Order..');
            }
            finally {
                next();
            }
        });
        // getUsersOrder
        this.currentOrderByUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = Number(req.params.user_id);
                const getOrders = yield order.currentOrderByUser(user_id);
                res.json(getOrders);
            }
            catch (e) {
                res.send('Can not get the ordres details...');
            }
            finally {
                next();
            }
        });
    }
}
exports.default = orderHandler;

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
const product_1 = __importDefault(require("../models/product"));
const product = new product_1.default();
class productHandler {
    constructor() {
        this.index = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product.index();
                res.json(products);
            }
            catch (e) {
                res.send('No products found..');
            }
            finally {
                next();
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let name = req.body.name;
                let price = req.body.price;
                let category = req.body.category;
                //to check if category is defined or not
                if (typeof category === 'undefined')
                    category = 'Category is not defined';
                const newProduct = yield product.create(name, Number(price), category);
                res.send(newProduct);
                next();
            }
            catch (e) {
                res.send('Cannot create Product');
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getProduct = yield product.show(Number(req.params.id));
                res.json(getProduct);
            }
            catch (e) {
                res.send('Product Not found');
            }
            finally {
                next();
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let id = Number(req.params.id);
                let name = req.body.name;
                let price = req.body.price;
                let category = req.body.category;
                const updatedProduct = yield product.update(id, name, price, category);
                res.json(updatedProduct);
            }
            catch (e) {
                res.send('product can not be updated');
            }
            finally {
                next();
            }
        });
        this.getProductsByCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getProducts = yield product.getProductsByCategory(req.params.category);
                //console.log(getProducts);
                res.json(getProducts);
            }
            catch (e) {
                res.send('Product with this kind of category not found');
            }
            finally {
                next();
            }
        });
        this.getTopProducts = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getTopProducts = yield product.getTopProducts();
                res.json(getTopProducts);
            }
            catch (e) {
                res.send('Error while finding top products');
            }
            finally {
                next();
            }
        });
    }
}
exports.default = productHandler;

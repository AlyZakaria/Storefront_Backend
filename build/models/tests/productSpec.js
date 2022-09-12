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
const product_1 = __importDefault(require("../product"));
const database_1 = __importDefault(require("../../database"));
const product_Object = new product_1.default();
describe('Testing Product-table', () => {
    let product = {
        name: 'Legion 5',
        price: 20000,
        category: 'laptops',
    };
    //create product
    it('Product created', () => __awaiter(void 0, void 0, void 0, function* () {
        const productCreated = yield product_Object.create(product.name, product.price, product.category);
        expect([
            productCreated.name,
            productCreated.price,
            productCreated.category,
        ]).toEqual([product.name, product.price, product.category]);
    }));
    // get all products
    it('get all products using index-method', () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield product_Object.index();
        expect(products.length).toEqual(1);
    }));
    // get specific product using show-method
    it('get specific product using show-method', () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield product_Object.show(1);
        expect([products.name, products.price, products.category]).toEqual([
            product.name,
            product.price,
            product.category,
        ]);
    }));
    //get product by category
    it('get product by category', () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield product_Object.getProductsByCategory('laptop');
        expect(products[0].category).toEqual(product.category);
    }));
    // update product
    it('Product has been updated', () => __awaiter(void 0, void 0, void 0, function* () {
        product.price = 18000;
        const updatedProduct = yield product_Object.update(1, product.name, product.price, product.category);
        expect(updatedProduct.price).toBe(product.price);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const conn = yield database_1.default.connect();
            const query = `TRUNCATE TABLE users , orders, products ,order_products RESTART IDENTITY;`;
            const result = yield conn.query(query);
            conn.release();
        }
        catch (err) { }
    }));
});

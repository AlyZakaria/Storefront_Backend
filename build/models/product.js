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
const database_1 = __importDefault(require("../database"));
class productObject {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const query = `SELECT * FROM products`;
                const products = yield conn.query(query);
                if (!products.rows.length)
                    throw new Error();
                return products.rows;
            }
            catch (e) {
                throw e;
            }
            finally {
                conn.release();
            }
        });
    }
    create(name, price, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const query = `INSERT INTO products (name, price, category) VALUES
            ('${name}' , ${price}, '${category}') RETURNING * ;`;
                const product = yield conn.query(query);
                return product.rows[0];
            }
            catch (e) {
                throw e;
            }
            finally {
                conn.release();
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const query = `SELECT * FROM products WHERE id = ${id};`;
                const getProduct = yield conn.query(query);
                if (!getProduct.rows.length)
                    throw new Error();
                return getProduct.rows[0];
            }
            catch (e) {
                throw e;
            }
            finally {
                conn.release();
            }
        });
    }
    update(id, name, price, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const query = `UPDATE products SET
            name = '${name}', price = ${price}, category = '${category}'
            WHERE id = ${id} RETURNING *;`;
                const getProduct = yield conn.query(query);
                return getProduct.rows[0];
            }
            catch (e) {
                throw e;
            }
            finally {
                conn.release();
            }
        });
    }
    // get the products by categories
    getProductsByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const query = `SELECT * FROM products WHERE category LIKE '%${category}%'`;
                const getProduct = yield conn.query(query);
                if (!getProduct.rows.length)
                    throw new Error();
                return getProduct.rows;
            }
            catch (e) {
                throw e;
            }
            finally {
                conn.release();
            }
        });
    }
    // Get popular products
    getTopProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const query = `SELECT product_id , quantity FROM order_products;`;
                const res = yield conn.query(query);
                // we get top 5 products by getting summation of quantities of each product
                let map = this.puttingInMap(res.rows);
                let topFive = this.getTopFive(map);
                return topFive;
            }
            catch (e) {
                throw e;
            }
            finally {
                conn.release();
            }
        });
    }
    // helper functions
    // select all products_name and their quantities and putting_In_Map
    puttingInMap(products) {
        let map = new Map();
        let value;
        for (let i = 0; i < products.length; i++) {
            let product_id = Number(products[i].product_id);
            if (map.has(product_id)) {
                value = map.get(product_id);
                value += products[i].quantity;
                map.set(product_id, value);
            }
            else
                map.set(product_id, products[i].quantity);
        }
        const sortedmap = new Map([...map].reverse());
        return sortedmap;
    }
    getTopFive(map) {
        let topFive = [];
        let c = 0;
        for (let [key, value] of map) {
            let product = { product_id: key, quantity: value };
            topFive.push(product);
            if (c == 5)
                break;
            c++;
        }
        return topFive;
    }
}
exports.default = productObject;

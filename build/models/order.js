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
class orderObject {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const query = 'SELECT * FROM orders';
                const orders = yield conn.query(query);
                if (!orders.rows.length)
                    throw new Error();
                return orders.rows;
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
                const query = `SELECT * FROM orders where id = ${id};`;
                const getOrder = yield conn.query(query);
                return getOrder.rows[0];
            }
            catch (e) {
                throw e;
            }
            finally {
                conn.release();
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const query = `DELETE FROM orders WHERE id = ${id} RETURNING *;`;
                const deletedOrder = yield conn.query(query);
                if (deletedOrder.rows.length === 0)
                    throw new Error();
                return deletedOrder.rows[0];
            }
            catch (e) {
                throw e;
            }
            finally {
                conn.release();
            }
        });
    }
    create(status, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const query = `INSERT INTO orders (status , user_id) VALUES 
            ('${status}' , ${user_id}) RETURNING *;`;
                const newOrder = yield conn.query(query);
                return newOrder.rows[0];
            }
            catch (e) {
                throw e;
            }
            finally {
                conn.release();
            }
        });
    }
    // Add product to order
    addProduct(order_id, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const query = `INSERT INTO order_products (order_id , product_id , quantity) VALUES 
            (${order_id} , ${product_id} , ${quantity}) RETURNING *;`;
                const result = yield conn.query(query);
                return result.rows[0];
            }
            catch (e) {
                throw e;
            }
            finally {
                conn.release();
            }
        });
    }
    // getUser's Orders
    currentOrderByUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const query = `SELECT status , order_id , product_id , quantity FROM orders INNER JOIN order_products
             ON orders.id = order_products.order_id WHERE user_id = ${user_id}; `;
                const orderDetails = yield conn.query(query);
                return orderDetails.rows;
            }
            catch (e) {
                throw e;
            }
            finally {
                conn.release();
            }
        });
    }
}
exports.default = orderObject;

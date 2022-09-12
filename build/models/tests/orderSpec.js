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
const order_1 = __importDefault(require("../order"));
const users_1 = __importDefault(require("../users"));
const database_1 = __importDefault(require("../../database"));
const product_1 = __importDefault(require("../product"));
const order_Object = new order_1.default();
const product_Object = new product_1.default();
const User = new users_1.default();
// to create order first we need to create user
let user = {
    firstname: 'Aly',
    secondname: 'Zakaria',
    password: '0000',
};
let order = {
    status: 'active',
    user_id: '1',
};
describe('Testing order-table', () => {
    // creating user first
    it('user created', () => __awaiter(void 0, void 0, void 0, function* () {
        const userCreated = yield User.create(user.firstname, user.secondname, user.password);
        expect([
            userCreated.id,
            userCreated.firstname,
            userCreated.secondname,
        ]).toEqual([1, user.firstname, user.secondname]);
    }));
    /// create order
    it('order created', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield order_Object.create(order.status, Number(order.user_id));
        expect([
            createdOrder.id,
            createdOrder.status,
            createdOrder.user_id,
        ]).toEqual([1, order.status, order.user_id]);
    }));
    // get all orders
    it('get all orders using index-method', () => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield order_Object.index();
        expect(orders.length).toEqual(1);
    }));
    // get specified order
    it('get specified order using show-method', () => __awaiter(void 0, void 0, void 0, function* () {
        const getOrder = yield order_Object.show(1);
        expect([getOrder.id, getOrder.status, getOrder.user_id]).toEqual([
            1,
            order.status,
            order.user_id,
        ]);
    }));
    // delete specified order
    it('Order has been deleted', () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedOrder = yield order_Object.delete(1);
        // check by using show methow
        const getOrder = yield order_Object.show(1);
        expect(getOrder).toBeUndefined();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const conn = yield database_1.default.connect();
            const query = `TRUNCATE TABLE users , orders, order_products RESTART IDENTITY;`;
            const result = yield conn.query(query);
            conn.release();
        }
        catch (err) { }
    }));
});
describe('Testing order-products-table', () => {
    let productOrder = {
        order_id: 1,
        product_id: 1,
        quantity: 5,
    };
    let product = {
        name: 'Legion 5',
        price: 20000,
        category: 'laptops',
    };
    // first we need to create order & product & user
    it('user created', () => __awaiter(void 0, void 0, void 0, function* () {
        const userCreated = yield User.create(user.firstname, user.secondname, user.password);
        expect([
            userCreated.id,
            userCreated.firstname,
            userCreated.secondname,
        ]).toEqual([1, user.firstname, user.secondname]);
    }));
    it('Product created', () => __awaiter(void 0, void 0, void 0, function* () {
        const productCreated = yield product_Object.create(product.name, product.price, product.category);
        expect([
            productCreated.name,
            productCreated.price,
            productCreated.category,
        ]).toEqual([product.name, product.price, product.category]);
    }));
    it('order created', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield order_Object.create(order.status, Number(order.user_id));
        expect([
            createdOrder.id,
            createdOrder.status,
            createdOrder.user_id,
        ]).toEqual([1, order.status, order.user_id]);
    }));
    // then create order
    it('product has been added to order', () => __awaiter(void 0, void 0, void 0, function* () {
        const addedProduct = yield order_Object.addProduct(productOrder.order_id, productOrder.product_id, productOrder.quantity);
        expect([
            Number(addedProduct.order_id),
            Number(addedProduct.product_id),
            addedProduct.quantity,
        ]).toEqual([
            productOrder.order_id,
            productOrder.product_id,
            productOrder.quantity,
        ]);
    }));
    // get the orders of user
    it('get all orders of user', () => __awaiter(void 0, void 0, void 0, function* () {
        const getOrders = yield order_Object.currentOrderByUser(1);
        expect(getOrders.length).toBe(1);
        expect(Number(getOrders[0].order_id)).toBe(productOrder.order_id);
        expect(getOrders[0].quantity).toBe(productOrder.quantity);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const conn = yield database_1.default.connect();
            const query = `TRUNCATE TABLE users ,products, orders, order_products RESTART IDENTITY;`;
            const result = yield conn.query(query);
            conn.release();
        }
        catch (err) { }
    }));
});

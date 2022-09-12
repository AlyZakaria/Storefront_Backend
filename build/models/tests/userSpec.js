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
const users_1 = __importDefault(require("../users"));
const database_1 = __importDefault(require("../../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User = new users_1.default();
const pepper = process.env.BCRYPT_PASSWORD;
describe('Testing users-table', () => __awaiter(void 0, void 0, void 0, function* () {
    let user = {
        firstname: 'Aly',
        secondname: 'Zakaria',
        password: '0000',
    };
    // creating user
    it('user created', () => __awaiter(void 0, void 0, void 0, function* () {
        const userCreated = yield User.create(user.firstname, user.secondname, user.password);
        expect([
            userCreated.id,
            userCreated.firstname,
            userCreated.secondname,
        ]).toEqual([1, user.firstname, user.secondname]);
    }));
    // get all users
    it('get all users using index-method', () => __awaiter(void 0, void 0, void 0, function* () {
        const getUsers = yield User.index();
        expect(getUsers.length).toBe(1);
    }));
    // show user
    it('get specified user using show-method', () => __awaiter(void 0, void 0, void 0, function* () {
        const getUser = yield User.show(1);
        expect(getUser.firstname).toBe(user.firstname);
    }));
    // update User
    it('user has been updated', () => __awaiter(void 0, void 0, void 0, function* () {
        const updateUser = yield User.update(1, user.firstname, 'Fahmy', user.password);
        user.secondname = 'Fahmy';
        expect(updateUser.secondname).toBe(user.secondname);
    }));
    // authentication method
    it('user has been authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const getUser = yield User.authentication(user.firstname, 'Fahmy', user.password);
        expect([getUser.user.firstname, getUser.user.secondname]).toEqual([
            user.firstname,
            user.secondname,
        ]);
        expect(bcrypt_1.default.compareSync(user.password + pepper, getUser.user.password)).toBeTruthy();
    }));
    // Delete user
    it('user has been deleted', () => __awaiter(void 0, void 0, void 0, function* () {
        const getUser = yield User.delete(1);
        /// use index method to check if user has been deleted
        const getUsers = yield User.index();
        expect(getUsers.length).toBe(0);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const conn = yield database_1.default.connect();
            const query = `TRUNCATE TABLE users ,products ,orders, order_products RESTART IDENTITY;`;
            const result = yield conn.query(query);
            conn.release();
        }
        catch (err) { }
    }));
}));

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
const users_1 = __importDefault(require("../models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenSecret = process.env.TOKEN;
const user = new users_1.default();
class userHandler {
    constructor() {
        this.index = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user.index();
                res.json(users);
            }
            catch (e) {
                res.status(404);
                res.send('No users Found');
            }
            finally {
                next();
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getUser = yield user.show(Number(req.params.id));
                let token = jsonwebtoken_1.default.sign(getUser, tokenSecret);
                res.json(token);
            }
            catch (e) {
                res.send('User not found..');
            }
            finally {
                next();
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield user.delete(Number(req.params.id));
                res.json(deletedUser);
            }
            catch (e) {
                res.send('User not found');
            }
            finally {
                next();
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user.create(req.body.firstName, req.body.secondName, req.body.password);
                res.json(newUser);
            }
            catch (e) {
                res.send('Cannot create user');
            }
            finally {
                next();
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let id = Number(req.params.id);
                let firstName = req.body.firstName;
                let secondName = req.body.secondName;
                let password = req.body.password;
                const updatedUser = yield user.update(id, firstName, secondName, password);
                res.json(updatedUser);
            }
            catch (e) {
                res.send('Cannot update user');
            }
            finally {
                next();
            }
        });
        this.authentication = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let firstName = req.body.firstName;
                let secondName = req.body.secondName;
                let password = req.body.password;
                const getUser = yield user.authentication(firstName, secondName, password);
                res.json(getUser);
                next();
            }
            catch (e) {
                res.send('User Not Found');
            }
        });
    }
}
exports.default = userHandler;

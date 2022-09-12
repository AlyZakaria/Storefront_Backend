"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../handlers/users"));
const body_parser_1 = __importDefault(require("body-parser"));
const checkUserInputs_1 = __importDefault(require("../middlewares/checkUserInputs"));
const verifyAuth_1 = __importDefault(require("../middlewares/verifyAuth"));
const userHandle = new users_1.default();
const userRoutes = (app) => {
    app.get('/users', verifyAuth_1.default, userHandle.index);
    app.get('/users/:id', verifyAuth_1.default, userHandle.show);
    app.delete('/users/:id', verifyAuth_1.default, userHandle.delete);
    app.post('/users', body_parser_1.default.json(), checkUserInputs_1.default, userHandle.create);
    app.post('/users/authentication', body_parser_1.default.json(), userHandle.authentication);
    app.put('/users/:id', body_parser_1.default.json(), checkUserInputs_1.default, verifyAuth_1.default, userHandle.update);
};
exports.default = userRoutes;

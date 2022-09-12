"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (_req, res) => {
    res.send('Home Page..');
});
(0, userRoutes_1.default)(app);
(0, productRoutes_1.default)(app);
(0, orderRoutes_1.default)(app);
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

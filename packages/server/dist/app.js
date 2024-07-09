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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_jwt_1 = require("express-jwt");
const lodash_1 = require("lodash");
const connection_mongo_1 = __importDefault(require("./src/db/connection-mongo"));
const routes_1 = __importDefault(require("./src/routes"));
const port = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/api', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_mongo_1.default)();
    next();
}));
app.use('/api', (0, express_jwt_1.expressjwt)({
    secret: 'helloworld',
    algorithms: ['HS512'],
}).unless({
    path: [/^\/api\/login/, /^\/api\/regist/]
}));
(0, lodash_1.each)(routes_1.default, route => {
    app.use(route.getRoute());
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: '404'
    });
});
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            success: false,
            msg: err.name
        });
    }
    return res.status(500).json({
        success: false,
        msg: err.toString()
    });
});
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});

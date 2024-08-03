"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
try {
    const app = (0, express_1.default)();
    /** Initialize middlewares except for Auth and Error handling */
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    /**
     * API Routes
     */
    const port = config_1.PORT || 3000;
    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });
}
catch (error) {
    console.log(error);
}

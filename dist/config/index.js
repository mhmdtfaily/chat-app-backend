"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS_ORIGIN = exports.DB_PORT = exports.DB_PASSWORD = exports.DB_DRIVER = exports.DB_HOST = exports.DB_USER = exports.DB_NAME = exports.PORT = exports.NODE_ENV = exports.CORS_CREDENTIALS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
exports.CORS_CREDENTIALS = process.env.CORS_CREDENTIALS === 'true';
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.PORT = _a.PORT, exports.DB_NAME = _a.DB_NAME, exports.DB_USER = _a.DB_USER, exports.DB_HOST = _a.DB_HOST, exports.DB_DRIVER = _a.DB_DRIVER, exports.DB_PASSWORD = _a.DB_PASSWORD, exports.DB_PORT = _a.DB_PORT, exports.CORS_ORIGIN = _a.CORS_ORIGIN;
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
// Import routes and middlewares
const health_check_route_1 = __importDefault(require("./routes/health-check.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const chat_route_1 = __importDefault(require("./routes/chat.route"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
// Import Socket.io initialization
const socket_1 = require("./socket/socket");
// Configuration
const config_1 = require("./config");
try {
    // Initialize Express
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    // Middleware setup
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({ origin: config_1.CORS_ORIGIN, credentials: config_1.CORS_CREDENTIALS }));
    app.use(express_1.default.urlencoded({ extended: true }));
    // API Routes
    app.use("/health-check", health_check_route_1.default);
    app.use("/user", user_route_1.default);
    app.use("/chat", chat_route_1.default);
    // Error handling middleware
    app.use(error_middleware_1.default);
    // Initialize Socket.IO
    (0, socket_1.initializeSocket)(server);
    // Start the server
    const port = config_1.PORT || 3000;
    server.listen(port, () => {
        console.log(`Express is listening at http://localhost:${port}`);
    });
}
catch (e) {
    console.log(`Error on listening at http://localhost: ${e}`);
}
//# sourceMappingURL=app.js.map
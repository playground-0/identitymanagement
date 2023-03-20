"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = (process.env.PORT && parseInt(process.env.PORT)) || 8080;
// https://www.npmjs.com/package/cors
const whitelist = [
    "https://mentormountain.ca",
    "https://www.mentormountain.ca",
    "https://www.sfu.ca",
];
// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
const corsOptions = {
    origin: '*',
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/", (req, _, next) => {
    console.log("\n> Request URL:", req.originalUrl, "| Method:", req.method);
    next();
});
app.get("/api/health", (_, res) => {
    res.json({
        health: "OK",
    });
});
app.listen(port, () => {
    console.log(`Attaching to port ${port}`);
});

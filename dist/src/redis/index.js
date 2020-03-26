"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const REDIS_URL = process.env.REDIS || undefined;
exports.default = new ioredis_1.default(REDIS_URL);
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_schema_1 = __importDefault(require("./blog.schema"));
const author_schema_1 = __importDefault(require("./author.schema"));
exports.default = [
    author_schema_1.default,
    blog_schema_1.default,
];
//# sourceMappingURL=index.js.map
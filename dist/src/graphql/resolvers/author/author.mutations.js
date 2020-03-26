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
const author_schema_1 = __importDefault(require("../../../mongo/schemas/author.schema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../../index");
exports.default = {
    register: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
        const { input } = args;
        const author = new author_schema_1.default(Object.assign({}, input));
        return yield author.save();
    }),
    login: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
        const { input } = args;
        const result = yield author_schema_1.default.verifyPassword(input.email, input.password);
        if (result) {
            const authToken = jsonwebtoken_1.default.sign({ id: result.id }, index_1.JWT_SECRET);
            return { authToken };
        }
        throw new Error('Invalid email or password');
    }),
};
//# sourceMappingURL=author.mutations.js.map
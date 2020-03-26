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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apollo_server_1 = require("apollo-server");
const schemas_1 = __importDefault(require("./schemas"));
const resolvers_1 = __importDefault(require("./resolvers"));
const author_schema_1 = __importDefault(require("../mongo/schemas/author.schema"));
exports.JWT_SECRET = 'NOT_SO_SECURE_ISNT_IT';
const server = new apollo_server_1.ApolloServer({
    typeDefs: schemas_1.default,
    resolvers: resolvers_1.default,
    introspection: true,
    playground: true,
    context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization || "";
        if (!token) {
            return {};
        }
        const userId = jsonwebtoken_1.default.verify(token, exports.JWT_SECRET).id;
        const userInfo = yield author_schema_1.default.findById(userId);
        return {
            userInfo
        };
    })
});
exports.default = server;
//# sourceMappingURL=index.js.map
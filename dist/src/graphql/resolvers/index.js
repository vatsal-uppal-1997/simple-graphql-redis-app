"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_subscriptions_1 = __importDefault(require("./blog/blog.subscriptions"));
const author_query_1 = __importDefault(require("./author/author.query"));
const blog_query_1 = __importDefault(require("./blog/blog.query"));
const author_mutations_1 = __importDefault(require("./author/author.mutations"));
const blog_mutations_1 = __importDefault(require("./blog/blog.mutations"));
exports.default = {
    Subscription: Object.assign({}, blog_subscriptions_1.default),
    Query: Object.assign(Object.assign({}, author_query_1.default), blog_query_1.default),
    Mutation: Object.assign(Object.assign({}, author_mutations_1.default), blog_mutations_1.default),
};
//# sourceMappingURL=index.js.map
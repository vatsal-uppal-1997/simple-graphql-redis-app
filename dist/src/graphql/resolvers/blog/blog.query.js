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
const blog_schema_1 = __importDefault(require("../../../mongo/schemas/blog.schema"));
const author_schema_1 = __importDefault(require("../../../mongo/schemas/author.schema"));
const redis_1 = __importDefault(require("../../../redis"));
const authed_guard_1 = require("../../guards/authed.guard");
exports.CACHE_KEYS = {
    BLOGS_ARR: 'blogs_arr',
    BLOGS_OBJ: 'blogs_obj',
};
exports.default = {
    getBlogs: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
        authed_guard_1.authed(context);
        const isCached = yield redis_1.default.get(exports.CACHE_KEYS.BLOGS_ARR);
        if (isCached) {
            console.log('cache hit for getBlogs');
            return JSON.parse(isCached);
        }
        const blogs = yield blog_schema_1.default.find({}).lean();
        let withAuthors = [];
        for (let i = 0; i < blogs.length; i++) {
            const blog = blogs[i];
            const author = yield author_schema_1.default.findById(blog.authorID);
            withAuthors.push(Object.assign(Object.assign({}, blog), { author }));
        }
        redis_1.default.set(exports.CACHE_KEYS.BLOGS_ARR, JSON.stringify(withAuthors));
        return withAuthors;
    }),
    getBlog: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        authed_guard_1.authed(context);
        const { id } = args;
        const isCached = yield redis_1.default.get(exports.CACHE_KEYS.BLOGS_OBJ);
        if (isCached) {
            const parsed = JSON.parse(isCached);
            if (parsed[id]) {
                console.log('cache hit for getBlog');
                return parsed[id];
            }
        }
        const blog = yield blog_schema_1.default.findById(id).lean();
        const author = yield author_schema_1.default.findById((_a = blog) === null || _a === void 0 ? void 0 : _a.authorID).lean();
        if (isCached) {
            const parsed = JSON.parse(isCached);
            redis_1.default.set(exports.CACHE_KEYS.BLOGS_OBJ, JSON.stringify(Object.assign(Object.assign({}, parsed), { [id]: Object.assign(Object.assign({}, blog), { author }) })));
        }
        else {
            redis_1.default.set(exports.CACHE_KEYS.BLOGS_OBJ, JSON.stringify({ [id]: Object.assign(Object.assign({}, blog), { author }) }));
        }
        return Object.assign(Object.assign({}, blog), { author });
    })
};
//# sourceMappingURL=blog.query.js.map
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
const redis_1 = __importDefault(require("../../../redis"));
const blog_subscriptions_1 = require("./blog.subscriptions");
const blog_query_1 = require("./blog.query");
const authed_guard_1 = require("../../guards/authed.guard");
exports.default = {
    addBlog: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const userInfo = authed_guard_1.authed(context);
        const { input } = args;
        const blog = new blog_schema_1.default(Object.assign(Object.assign({}, input), { authorID: userInfo.id || userInfo._id }));
        yield blog.save();
        // invalidate the cache
        redis_1.default.del(blog_query_1.CACHE_KEYS.BLOGS_ARR, blog_query_1.CACHE_KEYS.BLOGS_OBJ);
        blog_subscriptions_1.pubsub.publish(blog_subscriptions_1.EVENTS.BLOG_ADDED, { blogAdded: blog });
        return Object.assign(Object.assign({}, blog.toObject()), { author: userInfo });
    }),
    updateBlog: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const userInfo = authed_guard_1.authed(context);
        const { input } = args;
        const blog = yield blog_schema_1.default.findOne({
            _id: input.id,
            authorID: userInfo.id || userInfo._id,
        });
        if (!blog) {
            throw new Error('No such blog exists');
        }
        let update = {};
        if (input.title) {
            update.title = input.title;
        }
        if (input.body) {
            update.body = input.body;
        }
        if (Object.keys(update).length === 0) {
            return blog;
        }
        const updatedBlog = yield blog_schema_1.default.findByIdAndUpdate(input.id, {
            $set: Object.assign({}, update)
        }, { new: true }).lean();
        // invalidate the cache
        redis_1.default.del(blog_query_1.CACHE_KEYS.BLOGS_ARR, blog_query_1.CACHE_KEYS.BLOGS_OBJ);
        blog_subscriptions_1.pubsub.publish(blog_subscriptions_1.EVENTS.BLOG_UPDATED, { blogUpdated: updatedBlog });
        return Object.assign(Object.assign({}, updatedBlog), { author: userInfo });
    }),
    deleteBlog: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const userInfo = authed_guard_1.authed(context);
        const { id } = args;
        const blog = yield blog_schema_1.default.findOne({
            _id: id,
            authorID: userInfo.id || userInfo._id,
        });
        if (!blog) {
            throw new Error('No such blog exists');
        }
        yield blog_schema_1.default.findByIdAndDelete(id);
        // invalidate the cache
        redis_1.default.del(blog_query_1.CACHE_KEYS.BLOGS_ARR, blog_query_1.CACHE_KEYS.BLOGS_OBJ);
        blog_subscriptions_1.pubsub.publish(blog_subscriptions_1.EVENTS.BLOG_UPDATED, { blogDeleted: blog });
        return Object.assign(Object.assign({}, blog), { author: userInfo });
    })
};
//# sourceMappingURL=blog.mutations.js.map
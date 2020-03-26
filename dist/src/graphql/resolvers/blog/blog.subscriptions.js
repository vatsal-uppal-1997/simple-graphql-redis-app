"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.pubsub = new apollo_server_1.PubSub();
exports.EVENTS = {
    BLOG_ADDED: 'BLOG_ADDED',
    BLOG_UPDATED: 'BLOG_UPDATED',
    BLOG_DELETED: 'BLOG_DELETED',
};
exports.default = {
    blogAdded: {
        subscribe: () => exports.pubsub.asyncIterator([exports.EVENTS.BLOG_ADDED]),
    },
    blogDeleted: {
        subscribe: () => exports.pubsub.asyncIterator([exports.EVENTS.BLOG_DELETED]),
    },
    blogUpdated: {
        subscribe: () => exports.pubsub.asyncIterator([exports.EVENTS.BLOG_UPDATED]),
    },
};
//# sourceMappingURL=blog.subscriptions.js.map
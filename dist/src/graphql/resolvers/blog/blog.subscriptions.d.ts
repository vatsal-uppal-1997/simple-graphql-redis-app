import { PubSub } from 'apollo-server';
export declare const pubsub: PubSub;
export declare const EVENTS: {
    readonly BLOG_ADDED: "BLOG_ADDED";
    readonly BLOG_UPDATED: "BLOG_UPDATED";
    readonly BLOG_DELETED: "BLOG_DELETED";
};
declare const _default: {
    blogAdded: {
        subscribe: () => AsyncIterator<unknown, any, undefined>;
    };
    blogDeleted: {
        subscribe: () => AsyncIterator<unknown, any, undefined>;
    };
    blogUpdated: {
        subscribe: () => AsyncIterator<unknown, any, undefined>;
    };
};
export default _default;
//# sourceMappingURL=blog.subscriptions.d.ts.map
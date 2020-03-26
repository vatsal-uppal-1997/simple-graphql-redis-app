/// <reference types="mongoose" />
declare const _default: {
    addBlog: (_: any, args: any, context: any) => Promise<any>;
    updateBlog: (_: any, args: any, context: any) => Promise<import("../../../mongo/schemas/blog.schema").IBlog | {
        author: any;
    } | {
        author: any;
        _id: any;
        title: string;
        authorID: string;
        body: string;
    }>;
    deleteBlog: (_: any, args: any, context: any) => Promise<{
        author: any;
        title: string;
        authorID: string;
        body: string;
        increment(): import("../../../mongo/schemas/blog.schema").IBlog;
        model<T extends import("mongoose").Document>(name: string): import("mongoose").Model<T, {}>;
        $isDeleted(isDeleted: boolean): void;
        $isDeleted(): boolean;
        remove(fn?: ((err: any, product: import("../../../mongo/schemas/blog.schema").IBlog) => void) | undefined): Promise<import("../../../mongo/schemas/blog.schema").IBlog>;
        save(options?: import("mongoose").SaveOptions | undefined, fn?: ((err: any, product: import("../../../mongo/schemas/blog.schema").IBlog) => void) | undefined): Promise<import("../../../mongo/schemas/blog.schema").IBlog>;
        save(fn?: ((err: any, product: import("../../../mongo/schemas/blog.schema").IBlog) => void) | undefined): Promise<import("../../../mongo/schemas/blog.schema").IBlog>;
        __v?: number | undefined;
        errors: any;
        _id: any;
        isNew: boolean;
        schema: import("mongoose").Schema<any>;
        $locals: {
            [k: string]: any;
        };
        id?: any;
        base: typeof import("mongoose");
        baseModelName: string | undefined;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        discriminators: any;
        modelName: string;
    }>;
};
export default _default;
//# sourceMappingURL=blog.mutations.d.ts.map
import mongoose from 'mongoose';
export interface IBlog extends mongoose.Document {
    title: string;
    authorID: string;
    body: string;
}
declare const _default: mongoose.Model<IBlog, {}>;
export default _default;
//# sourceMappingURL=blog.schema.d.ts.map
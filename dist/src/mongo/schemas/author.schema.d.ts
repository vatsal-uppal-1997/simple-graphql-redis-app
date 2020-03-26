import mongoose from 'mongoose';
export interface IAuthor extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
}
export interface IAuthorModel extends mongoose.Model<IAuthor> {
    verifyPassword(email: String, password: String): Promise<IAuthor | false>;
}
declare const _default: IAuthorModel;
export default _default;
//# sourceMappingURL=author.schema.d.ts.map
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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const AuthorSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    userName: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const isAuthor = (document) => {
    if (document.email && document.userName) {
        return true;
    }
    return false;
};
AuthorSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (isAuthor(this)) {
            const password = this.password;
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            this.password = hashedPassword;
            return this;
        }
        throw new Error('This is not of type author');
    });
});
AuthorSchema.statics.verifyPassword = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const author = yield this.findOne({ email });
        if (author && author.email) {
            const hashedPassword = author.password;
            return (yield bcrypt_1.default.compare(password, hashedPassword)) ? author : false;
        }
        return false;
    });
};
exports.default = mongoose_1.default.model('Author', AuthorSchema);
//# sourceMappingURL=author.schema.js.map
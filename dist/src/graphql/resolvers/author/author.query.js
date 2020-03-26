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
const author_schema_1 = __importDefault(require("../../../mongo/schemas/author.schema"));
const redis_1 = __importDefault(require("../../../redis"));
const authed_guard_1 = require("../../guards/authed.guard");
exports.CACHE_KEYS = {
    AUTHORS_ARR: 'authors_arr',
    AUTHORS_OBJ: 'authors_obj'
};
exports.default = {
    getProfiles: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
        authed_guard_1.authed(context);
        const isCached = yield redis_1.default.get(exports.CACHE_KEYS.AUTHORS_ARR);
        if (isCached) {
            return JSON.parse(isCached);
        }
        const authors = yield author_schema_1.default.find({}).lean();
        redis_1.default.set(exports.CACHE_KEYS.AUTHORS_ARR, JSON.stringify(authors));
        return authors;
    }),
    getProfile: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        authed_guard_1.authed(context);
        const { id } = args;
        const isCached = yield redis_1.default.get(exports.CACHE_KEYS.AUTHORS_OBJ);
        if (isCached) {
            const parsed = JSON.parse(isCached);
            if (parsed[id]) {
                return parsed[id];
            }
        }
        const author = yield author_schema_1.default.findById(id);
        if (isCached) {
            const parsed = JSON.parse(isCached);
            redis_1.default.set(exports.CACHE_KEYS.AUTHORS_OBJ, JSON.stringify(Object.assign(Object.assign({}, parsed), { [id]: author })));
        }
        return author;
    })
};
//# sourceMappingURL=author.query.js.map
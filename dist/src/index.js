"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const graphql_1 = __importDefault(require("./graphql"));
const config_json_1 = __importDefault(require("./config/config.json"));
const PORT = process.env.PORT || 8080;
mongoose_1.default
    .connect(config_json_1.default.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    graphql_1.default
        .listen(PORT)
        .then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    })
        .catch(err => {
        console.log('An error occurred while setting up the server');
        console.log(err);
    });
})
    .catch((err) => {
    console.log('Some error occurred while connecting to mongo');
    console.log(err);
});
//# sourceMappingURL=index.js.map
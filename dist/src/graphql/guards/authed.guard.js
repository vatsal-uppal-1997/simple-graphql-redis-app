"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authed = (context) => {
    const { userInfo } = context;
    if (!(userInfo && userInfo.email)) {
        throw new Error('Not authenticated');
    }
    return userInfo;
};
//# sourceMappingURL=authed.guard.js.map
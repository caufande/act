"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const vite_1 = require("vite");
const viteLogger = (0, vite_1.createLogger)('info', {
    prefix: '[taro]',
    allowClearScreen: false
});
exports.logger = {
    info(msg) {
        viteLogger.info(msg, {
            timestamp: true
        });
    },
    warn(msg) {
        viteLogger.warn(msg, {
            timestamp: true
        });
    },
    error(msg) {
        viteLogger.error(msg, {
            timestamp: true
        });
    }
};
//# sourceMappingURL=logger.js.map
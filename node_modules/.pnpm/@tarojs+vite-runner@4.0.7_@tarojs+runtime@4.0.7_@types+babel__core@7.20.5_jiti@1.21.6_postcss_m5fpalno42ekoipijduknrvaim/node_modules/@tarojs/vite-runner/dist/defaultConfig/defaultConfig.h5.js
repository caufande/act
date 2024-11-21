"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runner_utils_1 = require("@tarojs/runner-utils");
const platform = 'h5';
const defaultConfig = {
    staticDirectory: 'static',
    sourceRoot: 'src',
    outputRoot: 'dist',
    output: {
        chunkFileNames: 'js/[name].[hash].js'
    },
    imageUrlLoaderOption: {
        limit: runner_utils_1.IMAGE_LIMIT
    },
    fontUrlLoaderOption: {
        limit: runner_utils_1.FONT_LIMIT
    },
    mediaUrlLoaderOption: {
        limit: runner_utils_1.MEDIA_LIMIT
    },
    postcss: {
        url: {
            enable: true,
            config: {
                url: 'rebase'
            }
        },
        autoprefixer: {
            enable: true,
            config: {
                flexbox: 'no-2009'
            }
        },
        pxtransform: {
            enable: true,
            config: {
                platform
            }
        },
        htmltransform: {
            enable: true,
            config: {
                platform,
                removeCursorStyle: false
            }
        }
    }
};
exports.default = defaultConfig;
//# sourceMappingURL=defaultConfig.h5.js.map
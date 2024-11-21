"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runner_utils_1 = require("@tarojs/runner-utils");
const platform = 'mini';
const defaultConfig = {
    sourceRoot: 'src',
    outputRoot: 'dist',
    output: {
        chunkFileNames: '[name].js',
    },
    fileType: {
        style: '.wxss',
        config: '.json',
        script: '.js',
        templ: '.wxml'
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
//# sourceMappingURL=defaultConfig.mini.js.map
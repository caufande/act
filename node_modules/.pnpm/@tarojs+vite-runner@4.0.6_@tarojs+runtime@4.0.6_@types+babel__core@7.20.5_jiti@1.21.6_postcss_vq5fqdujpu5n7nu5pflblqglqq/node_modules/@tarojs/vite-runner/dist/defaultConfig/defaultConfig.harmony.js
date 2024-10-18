"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runner_utils_1 = require("@tarojs/runner-utils");
const platform = 'harmony';
const defaultConfig = {
    sourceRoot: 'src',
    fileType: {
        style: '.css',
        config: '.json',
        script: '.js',
        templ: '.hml'
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
            enable: false,
            config: {
                flexbox: 'no-2009'
            }
        },
        pxtransform: {
            enable: true,
            config: {
                platform,
                methods: ['platform', 'size'],
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
//# sourceMappingURL=defaultConfig.harmony.js.map
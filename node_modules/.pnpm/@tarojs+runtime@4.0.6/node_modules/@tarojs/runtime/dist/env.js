import { EMPTY_OBJ } from '@tarojs/shared';

const env = {
    window: process.env.TARO_PLATFORM === 'web' ? window : EMPTY_OBJ,
    document: process.env.TARO_PLATFORM === 'web' ? document : EMPTY_OBJ
};

export { env as default };
//# sourceMappingURL=env.js.map

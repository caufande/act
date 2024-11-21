import env from '../env.js';

// Note: 小程序端 vite 打包成 commonjs，const getComputedStyle = xxx 会报错，所以把 GetComputedStyle 改为 taroGetComputedStyleProvider
const taroGetComputedStyleProvider = process.env.TARO_PLATFORM === 'web' ? env.window.getComputedStyle : function (element) {
    return element.style;
};

export { taroGetComputedStyleProvider };
//# sourceMappingURL=getComputedStyle.js.map

import Taro from '@tarojs/api';
export { getCurrentPages } from '@tarojs/router';

const getApp = function () {
    return Taro.getCurrentInstance().app;
};
// 自定义组件
const getCurrentInstance = Taro.getCurrentInstance;

export { getApp, getCurrentInstance };
//# sourceMappingURL=index.js.map

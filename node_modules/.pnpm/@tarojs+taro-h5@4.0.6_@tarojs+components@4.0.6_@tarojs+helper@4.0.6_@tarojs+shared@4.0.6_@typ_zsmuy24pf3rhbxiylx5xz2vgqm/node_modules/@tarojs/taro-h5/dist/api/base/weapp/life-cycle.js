import Taro from '@tarojs/api';

const launchOptions = {
    path: '',
    query: {},
    scene: 0,
    shareTicket: '',
    referrerInfo: {}
};
function initLaunchOptions(options = {}) {
    Object.assign(launchOptions, options);
}
Taro.eventCenter.once('__taroRouterLaunch', initLaunchOptions);
// 生命周期
const getLaunchOptionsSync = () => launchOptions;
const getEnterOptionsSync = () => launchOptions;

export { getEnterOptionsSync, getLaunchOptionsSync };
//# sourceMappingURL=life-cycle.js.map

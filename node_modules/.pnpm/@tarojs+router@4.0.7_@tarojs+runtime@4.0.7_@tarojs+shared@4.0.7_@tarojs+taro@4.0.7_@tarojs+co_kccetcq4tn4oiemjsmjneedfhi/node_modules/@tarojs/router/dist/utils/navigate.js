import { eventCenter } from '@tarojs/runtime';

const isWeixin = () => !!navigator.userAgent.match(/\bMicroMessenger\b/ig);
const isDingTalk = () => !!navigator.userAgent.match(/\bDingTalk\b/ig);
let preTitle = document.title;
let isLoadDdEntry = false;
function setMpaTitle(title) {
    if (preTitle === title)
        return;
    document.title = title;
    preTitle = title;
    if (process.env.SUPPORT_DINGTALK_NAVIGATE !== 'disabled' && isDingTalk()) {
        if (!isLoadDdEntry) {
            isLoadDdEntry = true;
            require('dingtalk-jsapi/platform');
        }
        const setDingTitle = require('dingtalk-jsapi/api/biz/navigation/setTitle').default;
        setDingTitle({ title });
    }
}
function setTitle(title) {
    eventCenter.trigger('__taroH5SetNavigationBarTitle', title);
}
function setNavigationBarStyle(option) {
    eventCenter.trigger('__taroH5setNavigationBarColor', option);
}
function setNavigationBarLoading(loading) {
    eventCenter.trigger('__taroH5setNavigationBarLoading', loading);
}

export { isDingTalk, isWeixin, setMpaTitle, setNavigationBarLoading, setNavigationBarStyle, setTitle };

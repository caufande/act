import { __awaiter } from 'tslib';
import { isFunction } from '@tarojs/shared';
import { MethodHandler } from '../../utils/handler.js';
import { setStorage, setStorageSync, getStorageSync } from '../storage/index.js';
import { showToast } from '../ui/interaction/index.js';

/**
 * 剪贴板部分的api参考了Chameleon项目的实现：
 *
 * setClipboardData: https://github.com/chameleon-team/chameleon-api/tree/master/src/interfaces/setClipBoardData
 * getClipboardData: https://github.com/chameleon-team/chameleon-api/tree/master/src/interfaces/getClipBoardData
 */
const CLIPBOARD_STORAGE_NAME = 'taro_clipboard';
document.addEventListener('copy', () => {
    var _a;
    setStorage({
        key: CLIPBOARD_STORAGE_NAME,
        data: (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString()
    }).catch(e => {
        console.error(e);
    });
});
/**
 * 设置系统剪贴板的内容
 */
const setClipboardData = (_a) => __awaiter(void 0, [_a], void 0, function* ({ data, success, fail, complete }) {
    const handle = new MethodHandler({ name: 'setClipboardData', success, fail, complete });
    try {
        setStorageSync(CLIPBOARD_STORAGE_NAME, data);
        /**
         * 已于 iPhone 6s Plus iOS 13.1.3 上的 Safari 测试通过
         * iOS < 10 的系统可能无法使用编程方式访问剪贴板，参考：
         * https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios/34046084
         */
        if (isFunction(document.execCommand)) {
            const textarea = document.createElement('textarea');
            textarea.readOnly = true;
            textarea.value = data;
            textarea.style.position = 'absolute';
            textarea.style.width = '100px';
            textarea.style.left = '-10000px';
            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
        else {
            throw new Error('Unsupported Function: \'document.execCommand\'.');
        }
        showToast({
            title: '内容已复制',
            icon: 'none',
            duration: 1500
        });
        return handle.success();
    }
    catch (e) {
        return handle.fail({ errMsg: e.message });
    }
});
/**
 * 获取系统剪贴板的内容
 */
const getClipboardData = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* ({ success, fail, complete } = {}) {
    const handle = new MethodHandler({ name: 'getClipboardData', success, fail, complete });
    try {
        const data = getStorageSync(CLIPBOARD_STORAGE_NAME);
        return handle.success({ data });
    }
    catch (e) {
        return handle.fail({ errMsg: e.message });
    }
});

export { getClipboardData, setClipboardData };
//# sourceMappingURL=clipboard.js.map

import { __rest } from 'tslib';
import './style.scss.js';
import queryString from 'query-string';
import { MethodHandler } from '../../utils/handler.js';

let container = null;
function createLocationChooser(handler, key = LOCATION_APIKEY, mapOpt = {}) {
    var _a, _b, _c;
    const { latitude, longitude } = mapOpt, opts = __rest(mapOpt, ["latitude", "longitude"]);
    const query = Object.assign({ key, type: 1, coord: ((_a = mapOpt.coord) !== null && _a !== void 0 ? _a : [latitude, longitude].every(e => Number(e) >= 0)) ? `${latitude},${longitude}` : undefined, referer: 'myapp' }, opts);
    if (!container) {
        const html = `
<div class='taro_choose_location'>
  <div class='taro_choose_location_bar'>
    <div class='taro_choose_location_back'></div>
    <p class='taro_choose_location_title'>位置</p>
    <button class='taro_choose_location_submit'>完成</button>
  </div>
  <iframe class='taro_choose_location_frame' frameborder='0' src="https://apis.map.qq.com/tools/locpicker?${queryString.stringify(query, { arrayFormat: 'comma', skipNull: true })}" />
</div>
`;
        container = document.createElement('div');
        container.innerHTML = html;
    }
    const main = container.querySelector('.taro_choose_location');
    function show() {
        setTimeout(() => {
            main.style.top = '0';
        });
    }
    function hide() {
        main.style.top = '100%';
    }
    function back() {
        hide();
        handler({ errMsg: 'cancel' });
    }
    function submit() {
        hide();
        handler();
    }
    function remove() {
        container === null || container === void 0 ? void 0 : container.remove();
        container = null;
        window.removeEventListener('popstate', back);
    }
    (_b = container.querySelector('.taro_choose_location_back')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', back);
    (_c = container.querySelector('.taro_choose_location_submit')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', submit);
    window.addEventListener('popstate', back);
    return {
        show,
        remove,
        container,
    };
}
/**
 * 打开地图选择位置。
 */
const chooseLocation = ({ success, fail, complete, mapOpts } = {}) => {
    const handle = new MethodHandler({ name: 'chooseLocation', success, fail, complete });
    return new Promise((resolve, reject) => {
        const chooseLocation = {};
        if (typeof LOCATION_APIKEY === 'undefined') {
            console.warn('chooseLocation api 依赖腾讯地图定位api，需要在 defineConstants 中配置 LOCATION_APIKEY');
            return handle.fail({
                errMsg: 'LOCATION_APIKEY needed'
            }, { resolve, reject });
        }
        const key = LOCATION_APIKEY;
        const onMessage = event => {
            // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
            const loc = event.data;
            // 防止其他应用也会向该页面 post 信息，需判断 module 是否为'locationPicker'
            if (!loc || loc.module !== 'locationPicker')
                return;
            chooseLocation.name = loc.poiname;
            chooseLocation.address = loc.poiaddress;
            chooseLocation.latitude = loc.latlng.lat;
            chooseLocation.longitude = loc.latlng.lng;
        };
        const chooser = createLocationChooser(res => {
            window.removeEventListener('message', onMessage, false);
            setTimeout(() => {
                chooser.remove();
            }, 300);
            if (res) {
                return handle.fail(res, { resolve, reject });
            }
            else {
                if (chooseLocation.latitude && chooseLocation.longitude) {
                    return handle.success(chooseLocation, { resolve, reject });
                }
                else {
                    return handle.fail({}, { resolve, reject });
                }
            }
        }, key, mapOpts);
        document.body.appendChild(chooser.container);
        window.addEventListener('message', onMessage, false);
        chooser.show();
    });
};

export { chooseLocation };
//# sourceMappingURL=chooseLocation.js.map

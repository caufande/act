import { temporarilyNotSupport, processOpenApi } from '../../utils/index.js';
export { getLocation } from './getLocation.js';
export { chooseLocation } from './chooseLocation.js';
export { offLocationChange, offLocationChangeError, onLocationChange, onLocationChangeError, startLocationUpdate, stopLocationUpdate } from './locationChange.js';

const startLocationUpdateBackground = /* @__PURE__ */ temporarilyNotSupport('startLocationUpdateBackground');
const openLocation = /* @__PURE__ */ processOpenApi({
    name: 'openLocation',
    defaultOptions: { scale: 18 }
});
const choosePoi = /* @__PURE__ */ temporarilyNotSupport('choosePoi');
const getFuzzyLocation = /* @__PURE__ */ temporarilyNotSupport('getFuzzyLocation');

export { choosePoi, getFuzzyLocation, openLocation, startLocationUpdateBackground };
//# sourceMappingURL=index.js.map

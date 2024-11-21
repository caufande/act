import { temporarilyNotSupport } from '../../../utils/index.js';
import { InnerAudioContext } from './InnerAudioContext.js';

// 音频
const stopVoice = /* @__PURE__ */ temporarilyNotSupport('stopVoice');
const setInnerAudioOption = /* @__PURE__ */ temporarilyNotSupport('setInnerAudioOption');
const playVoice = /* @__PURE__ */ temporarilyNotSupport('playVoice');
const pauseVoice = /* @__PURE__ */ temporarilyNotSupport('pauseVoice');
const getAvailableAudioSources = /* @__PURE__ */ temporarilyNotSupport('getAvailableAudioSources');
const createWebAudioContext = /* @__PURE__ */ temporarilyNotSupport('createWebAudioContext');
const createMediaAudioPlayer = /* @__PURE__ */ temporarilyNotSupport('createMediaAudioPlayer');
/**
 * 创建内部 audio 上下文 InnerAudioContext 对象。
 */
const createInnerAudioContext = () => new InnerAudioContext();
const createAudioContext = /* @__PURE__ */ temporarilyNotSupport('createAudioContext');

export { createAudioContext, createInnerAudioContext, createMediaAudioPlayer, createWebAudioContext, getAvailableAudioSources, pauseVoice, playVoice, setInnerAudioOption, stopVoice };
//# sourceMappingURL=index.js.map

import { temporarilyNotSupport } from '../../../utils/index.js';
import { BackgroundAudioManager } from './BackgroundAudioManager.js';

// 背景音频
const stopBackgroundAudio = /* @__PURE__ */ temporarilyNotSupport('stopBackgroundAudio');
const seekBackgroundAudio = /* @__PURE__ */ temporarilyNotSupport('seekBackgroundAudio');
const playBackgroundAudio = /* @__PURE__ */ temporarilyNotSupport('playBackgroundAudio');
const pauseBackgroundAudio = /* @__PURE__ */ temporarilyNotSupport('pauseBackgroundAudio');
const onBackgroundAudioStop = /* @__PURE__ */ temporarilyNotSupport('onBackgroundAudioStop');
const onBackgroundAudioPlay = /* @__PURE__ */ temporarilyNotSupport('onBackgroundAudioPlay');
const onBackgroundAudioPause = /* @__PURE__ */ temporarilyNotSupport('onBackgroundAudioPause');
const getBackgroundAudioPlayerState = /* @__PURE__ */ temporarilyNotSupport('getBackgroundAudioPlayerState');
/**
 * 获取全局唯一的背景音频管理器
 */
const getBackgroundAudioManager = () => new BackgroundAudioManager();

export { getBackgroundAudioManager, getBackgroundAudioPlayerState, onBackgroundAudioPause, onBackgroundAudioPlay, onBackgroundAudioStop, pauseBackgroundAudio, playBackgroundAudio, seekBackgroundAudio, stopBackgroundAudio };
//# sourceMappingURL=index.js.map

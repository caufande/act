import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

const indexCss = "audio{outline:none;max-width:100%}";

const Audio = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onError = createEvent(this, "error", 7);
    this.onPlay = createEvent(this, "play", 7);
    this.onPause = createEvent(this, "pause", 7);
    this.onTimeUpdate = createEvent(this, "timeupdate", 7);
    this.onEnded = createEvent(this, "ended", 7);
    this.src = undefined;
    this.controls = true;
    this.autoplay = false;
    this.loop = false;
    this.muted = false;
    this.nativeProps = {};
  }
  bindevent() {
    this.audio.addEventListener('timeupdate', (e) => {
      this.onTimeUpdate.emit({
        duration: e.srcElement.duration,
        currentTime: e.srcElement.duration
      });
    });
    this.audio.addEventListener('ended', () => {
      this.onEnded.emit();
    });
    this.audio.addEventListener('play', () => {
      this.onPlay.emit();
    });
    this.audio.addEventListener('pause', (e) => {
      this.onPause.emit(e);
    });
    // 1网络错误, 2解码错误, 3解码错误，4 不合适资源
    this.audio.addEventListener('error', (e) => {
      var _a;
      this.onError.emit({
        errMsg: (_a = e.srcElement.error) === null || _a === void 0 ? void 0 : _a.code
      });
    });
  }
  componentDidLoad() {
    this.bindevent();
  }
  render() {
    const { src, controls, autoplay, loop, muted, nativeProps } = this;
    return (h("audio", Object.assign({ src: src, controls: controls, autoplay: autoplay, loop: loop, muted: muted, ref: audio => { this.audio = audio; } }, nativeProps)));
  }
  static get style() { return indexCss; }
}, [0, "taro-audio-core", {
    "src": [1],
    "controls": [4],
    "autoplay": [4],
    "loop": [4],
    "muted": [4],
    "nativeProps": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-audio-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-audio-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Audio);
      }
      break;
  } });
}

const TaroAudioCore = Audio;
const defineCustomElement = defineCustomElement$1;

export { TaroAudioCore, defineCustomElement };

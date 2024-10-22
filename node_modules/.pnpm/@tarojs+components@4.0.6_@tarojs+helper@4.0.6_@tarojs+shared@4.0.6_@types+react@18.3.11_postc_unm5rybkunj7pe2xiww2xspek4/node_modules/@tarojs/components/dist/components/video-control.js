import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const formatTime = (time) => {
  if (!time)
    return '';
  const sec = Math.round(time % 60);
  const min = Math.round((time - sec) / 60);
  return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
};
const calcDist = (x, y) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};
const normalizeNumber = (number) => {
  return Math.max(-1, Math.min(number, 1));
};
let scene = 'default';
const screenFn = (function () {
  let val;
  const fnMap = [
    [
      'requestFullscreen',
      'exitFullscreen',
      'fullscreenElement',
      'fullscreenEnabled',
      'fullscreenchange',
      'fullscreenerror'
    ],
    // New WebKit
    [
      'webkitRequestFullscreen',
      'webkitExitFullscreen',
      'webkitFullscreenElement',
      'webkitFullscreenEnabled',
      'webkitfullscreenchange',
      'webkitfullscreenerror'
    ],
    // Old WebKit
    [
      'webkitRequestFullScreen',
      'webkitCancelFullScreen',
      'webkitCurrentFullScreenElement',
      'webkitCancelFullScreen',
      'webkitfullscreenchange',
      'webkitfullscreenerror'
    ],
    [
      'mozRequestFullScreen',
      'mozCancelFullScreen',
      'mozFullScreenElement',
      'mozFullScreenEnabled',
      'mozfullscreenchange',
      'mozfullscreenerror'
    ],
    [
      'msRequestFullscreen',
      'msExitFullscreen',
      'msFullscreenElement',
      'msFullscreenEnabled',
      'MSFullscreenChange',
      'MSFullscreenError'
    ]
  ];
  var defaultIOSMap = [
    'webkitEnterFullscreen',
    'webkitExitFullscreen',
    'webkitCurrentFullScreenElement',
    'webkitSupportsFullscreen',
    'fullscreenchange',
    'fullscreenerror'
  ];
  let i = 0;
  const l = fnMap.length;
  const ret = {};
  // This for loop essentially checks the current document object for the property/methods above.
  for (; i < l; i++) {
    val = fnMap[i];
    if (val && val[1] in document) {
      for (i = 0; i < val.length; i++) {
        ret[fnMap[0][i]] = val[i];
      }
      return ret;
    }
  }
  if (!ret[fnMap[0][0]]) {
    scene = 'iOS';
    // when there is no any APIs be set.
    // In IOS, there is no 'webkitEnterFullscreen' property `in document` but video can use it for fullscreen.
    // ref: https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1633500-webkitenterfullscreen
    for (i = 0; i < defaultIOSMap.length; i++) {
      ret[fnMap[0][i]] = defaultIOSMap[i];
    }
  }
  // If it doesn't find any of them, this whole function returns {}
  // and the fn variable is set to this returned value.
  return ret;
})();
const isHls = url => /\.(m3u8)($|\?)/i.test(url);

const VideoControl = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.visible = false;
    this.isDraggingProgressBall = false;
    this.percentage = 0;
    this.progressDimensions = {
      left: 0,
      width: 0
    };
    this.calcPercentage = (pageX) => {
      let pos = pageX - this.progressDimensions.left;
      pos = Math.max(pos, 0);
      pos = Math.min(pos, this.progressDimensions.width);
      return pos / this.progressDimensions.width;
    };
    this.onDragProgressBallStart = () => {
      this.isDraggingProgressBall = true;
      this.hideControlsTimer && clearTimeout(this.hideControlsTimer);
    };
    this.onClickProgress = (e) => {
      e.stopPropagation();
      const percentage = this.calcPercentage(e.pageX);
      this.seekFunc(percentage * this.duration);
      this.toggleVisibility(true);
    };
    this.controls = undefined;
    this.currentTime = undefined;
    this.duration = undefined;
    this.isPlaying = undefined;
    this.pauseFunc = undefined;
    this.playFunc = undefined;
    this.seekFunc = undefined;
    this.showPlayBtn = undefined;
    this.showProgress = undefined;
  }
  onDocumentTouchMove(e) {
    if (!this.isDraggingProgressBall)
      return;
    const touchX = e.touches[0].pageX;
    this.percentage = this.calcPercentage(touchX);
    this.setProgressBall(this.percentage);
    this.setCurrentTime(this.percentage * this.duration);
  }
  onDocumentTouchEnd() {
    if (!this.isDraggingProgressBall)
      return;
    this.isDraggingProgressBall = false;
    this.seekFunc(this.percentage * this.duration);
    this.toggleVisibility(true);
  }
  async setProgressBall(percentage) {
    if (this.progressBallRef) {
      this.progressBallRef.style.left = `${percentage * 100}%`;
    }
  }
  async toggleVisibility(nextVisible) {
    const visible = nextVisible === undefined ? !this.visible : nextVisible;
    if (visible) {
      this.hideControlsTimer && clearTimeout(this.hideControlsTimer);
      if (this.isPlaying) {
        this.hideControlsTimer = setTimeout(() => {
          this.toggleVisibility(false);
        }, 2000);
      }
      this.el.style.visibility = 'visible';
    }
    else {
      this.el.style.visibility = 'hidden';
    }
    this.visible = !!visible;
  }
  async getIsDraggingProgressBall() {
    return this.isDraggingProgressBall;
  }
  async setCurrentTime(time) {
    this.currentTimeRef.innerHTML = formatTime(time);
  }
  render() {
    const { controls, currentTime, duration, isPlaying, pauseFunc, playFunc, showPlayBtn, showProgress } = this;
    const formattedDuration = formatTime(duration);
    let playBtn;
    if (!showPlayBtn) {
      playBtn = null;
    }
    else if (isPlaying) {
      playBtn = h("div", { class: 'taro-video-control-button taro-video-control-button-pause', onClick: pauseFunc });
    }
    else {
      playBtn = h("div", { class: 'taro-video-control-button taro-video-control-button-play', onClick: playFunc });
    }
    return (h(Host, { class: 'taro-video-bar taro-video-bar-full' }, controls && (h("div", { class: 'taro-video-controls' }, playBtn, showProgress && (h("div", { class: 'taro-video-current-time', ref: dom => (this.currentTimeRef = dom) }, formatTime(currentTime))), showProgress && (h("div", { class: 'taro-video-progress-container', onClick: this.onClickProgress }, h("div", { class: 'taro-video-progress', ref: ref => {
        if (!ref)
          return;
        const rect = ref.getBoundingClientRect();
        this.progressDimensions.left = rect.left;
        this.progressDimensions.width = rect.width;
      } }, h("div", { class: 'taro-video-progress-buffered', style: { width: '100%' } }), h("div", { class: 'taro-video-ball', ref: dom => (this.progressBallRef = dom), onTouchStart: this.onDragProgressBallStart, style: {
        left: `${formattedDuration ? (this.currentTime / duration) * 100 : 0}%`
      } }, h("div", { class: 'taro-video-inner' }))))), showProgress && h("div", { class: 'taro-video-duration' }, formattedDuration))), h("slot", null)));
  }
  get el() { return this; }
}, [4, "taro-video-control", {
    "controls": [4],
    "currentTime": [2, "current-time"],
    "duration": [2],
    "isPlaying": [4, "is-playing"],
    "pauseFunc": [16],
    "playFunc": [16],
    "seekFunc": [16],
    "showPlayBtn": [4, "show-play-btn"],
    "showProgress": [4, "show-progress"],
    "setProgressBall": [64],
    "toggleVisibility": [64],
    "getIsDraggingProgressBall": [64],
    "setCurrentTime": [64]
  }, [[5, "touchmove", "onDocumentTouchMove"], [5, "touchend", "onDocumentTouchEnd"], [5, "touchcancel", "onDocumentTouchEnd"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-video-control"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-video-control":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, VideoControl);
      }
      break;
  } });
}

export { VideoControl as V, scene as a, calcDist as c, defineCustomElement as d, formatTime as f, isHls as i, normalizeNumber as n, screenFn as s };

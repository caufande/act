import { h, Host } from '@stencil/core';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import { throttle } from '../../utils';
import { formatTime, calcDist, normalizeNumber, screenFn, isHls, scene } from './utils';
export class Video {
  constructor() {
    this.currentTime = 0;
    this.isDraggingProgress = false;
    this.gestureType = 'none';
    this.analyzeGesture = (e) => {
      var _a;
      const obj = {
        type: 'none'
      };
      const nowX = e.touches[0].screenX;
      const nowY = e.touches[0].screenY;
      const distX = nowX - this.lastTouchScreenX;
      const distY = nowY - this.lastTouchScreenY;
      const enableVslideGesture = this.isFullScreen ? this.vslideGestureInFullscreen : this.vslideGesture;
      if (this.gestureType === 'none') {
        // 两点间距离
        const dist = calcDist(distX, distY);
        // 没有移动
        if (dist < 10)
          return obj;
        if (Math.abs(distY) >= Math.abs(distX)) {
          // 垂直方向移动：调整音量
          if (enableVslideGesture) {
            this.gestureType = 'adjustVolume';
            this.lastVolume = this.videoRef.volume;
          }
          else {
            return obj;
          }
        }
        else if (Math.abs(distY) < Math.abs(distX)) {
          // 水平方向移动：调整进度
          if (this.enableProgressGesture) {
            this.gestureType = 'adjustProgress';
            this.lastPercentage = this.currentTime / ((_a = this.duration) !== null && _a !== void 0 ? _a : this._duration);
          }
          else {
            return obj;
          }
        }
      }
      obj.type = this.gestureType;
      obj.dataX = normalizeNumber(distX / 200);
      obj.dataY = normalizeNumber(distY / 200);
      return obj;
    };
    this.loadNativePlayer = () => {
      var _a, _b;
      if (this.videoRef) {
        this.videoRef.src = this.src;
        (_b = (_a = this.videoRef).load) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    };
    this.init = () => {
      const { src, videoRef } = this;
      if (isHls(src)) {
        import(
        /* webpackExports: ["default"] */
        'hls.js').then(e => {
          const Hls = e.default;
          this.HLS = Hls;
          if (Hls.isSupported()) {
            if (this.hls) {
              this.hls.destroy();
            }
            this.hls = new Hls();
            this.hls.loadSource(src);
            this.hls.attachMedia(videoRef);
            this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
              this.autoplay && this.play();
            });
            this.hls.on(Hls.Events.ERROR, (_, data) => {
              this.handleError(data);
            });
          }
          else if (videoRef.canPlayType('application/vnd.apple.mpegurl')) {
            this.loadNativePlayer();
          }
          else {
            console.error('该浏览器不支持 HLS 播放');
          }
        });
      }
      else {
        this.loadNativePlayer();
      }
    };
    this.handlePlay = () => {
      this.isPlaying = true;
      this.isFirst = false;
      this.controlsRef.toggleVisibility(true);
      this.onPlay.emit();
    };
    this.handlePause = () => {
      this.isPlaying = false;
      this.controlsRef.toggleVisibility(true);
      this.onPause.emit();
    };
    this.handleEnded = () => {
      this.isFirst = true;
      this.pause();
      this.controlsRef.toggleVisibility();
      this.onEnded.emit();
    };
    this.handleTimeUpdate = throttle(async (e) => {
      var _a, _b;
      this.currentTime = this.videoRef.currentTime;
      const duration = this.duration || this._duration;
      const isControlDragging = await this.controlsRef.getIsDraggingProgressBall();
      if (this.controls && this.showProgress) {
        if (!isControlDragging && !this.isDraggingProgress) {
          this.controlsRef.setProgressBall(this.currentTime / duration);
          this.controlsRef.setCurrentTime(this.currentTime);
        }
      }
      this.danmuRef.tick(this.currentTime);
      this.onTimeUpdate.emit({
        duration: (_a = e.target) === null || _a === void 0 ? void 0 : _a.duration,
        currentTime: (_b = e.target) === null || _b === void 0 ? void 0 : _b.currentTime
      });
      if (this.duration) {
        if (this.currentTime >= this.duration) {
          this.seek(0);
          this.handleEnded();
        }
      }
    }, 250);
    this.handleError = e => {
      var _a, _b;
      if (this.hls) {
        switch (e.type) {
          case this.HLS.ErrorTypes.NETWORK_ERROR:
            // try to recover network error
            this.onError.emit({ errMsg: e.response });
            this.hls.startLoad();
            break;
          case this.HLS.ErrorTypes.MEDIA_ERROR:
            this.onError.emit({ errMsg: e.reason || '媒体错误,请重试' });
            this.hls.recoverMediaError();
            break;
          default:
            break;
        }
      }
      else {
        this.onError.emit({
          errMsg: (_b = (_a = e.target) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.message,
        });
      }
    };
    this.handleDurationChange = () => {
      this._duration = this.videoRef.duration;
    };
    this.handleProgress = () => {
      this.onProgress.emit();
    };
    this.handleLoadedMetaData = (e) => {
      const target = e.target;
      this.onLoadedMetaData.emit({
        width: target.videoWidth,
        height: target.videoHeight,
        duration: target.duration
      });
    };
    this._play = () => this.videoRef.play();
    this._pause = () => this.videoRef.pause();
    this._stop = () => {
      this.videoRef.pause();
      this._seek(0);
    };
    this._seek = (position) => {
      this.videoRef.currentTime = position;
    };
    this.onTouchStartContainer = (e) => {
      this.lastTouchScreenX = e.touches[0].screenX;
      this.lastTouchScreenY = e.touches[0].screenY;
    };
    this.onClickContainer = () => {
      if (this.enablePlayGesture) {
        const now = Date.now();
        if (now - this.lastClickedTime < 300) {
          // 双击
          this.isPlaying ? this.pause() : this.play();
        }
        this.lastClickedTime = now;
      }
      this.controlsRef.toggleVisibility();
    };
    this.onClickFullScreenBtn = (e) => {
      e.stopPropagation();
      this.toggleFullScreen();
    };
    this.handleFullScreenChange = e => {
      // 全屏后，"退出"走的是浏览器事件，在此同步状态
      const timestamp = new Date().getTime();
      if (!e.detail && this.isFullScreen && !document[screenFn.fullscreenElement] && timestamp - this.fullScreenTimestamp > 100) {
        this.toggleFullScreen(false, true);
      }
    };
    this.toggleFullScreen = (isFullScreen = !this.isFullScreen, fromBrowser = false) => {
      this.isFullScreen = isFullScreen; // this.videoRef?.['webkitDisplayingFullscreen']
      this.controlsRef.toggleVisibility(true);
      this.fullScreenTimestamp = new Date().getTime();
      this.onFullScreenChange.emit({
        fullScreen: this.isFullScreen,
        direction: 'vertical'
      });
      if (this.isFullScreen && !document[screenFn.fullscreenElement]) {
        setTimeout(() => {
          this.videoRef[screenFn.requestFullscreen]({ navigationUI: 'auto' });
          Taro.eventCenter.trigger('__taroEnterFullScreen', {});
        }, 0);
      }
      else {
        if (!fromBrowser) {
          // Note: 全屏后，"退出全屏"是浏览器按钮是浏览器内部按钮，非html按钮，点击"退出全屏"按钮是浏览器内部实现功能。此时再次调用exitFullscreen反而会报错，因此不再调用
          document[screenFn.exitFullscreen]();
        }
        Taro.eventCenter.trigger('__taroExitFullScreen', {});
      }
    };
    this.toggleMute = (e) => {
      e.stopPropagation();
      this.videoRef.muted = !this.isMute;
      this.controlsRef.toggleVisibility(true);
      this.isMute = !this.isMute;
    };
    this.toggleDanmu = (e) => {
      e.stopPropagation();
      this.controlsRef.toggleVisibility(true);
      this._enableDanmu = !this._enableDanmu;
    };
    this.src = undefined;
    this.duration = undefined;
    this.controls = true;
    this.autoplay = false;
    this.loop = false;
    this.muted = false;
    this.initialTime = 0;
    this.poster = undefined;
    this.objectFit = 'contain';
    this.showProgress = true;
    this.showFullscreenBtn = true;
    this.showPlayBtn = true;
    this.showCenterPlayBtn = true;
    this.showMuteBtn = false;
    this.danmuList = undefined;
    this.danmuBtn = false;
    this.enableDanmu = false;
    this.enablePlayGesture = false;
    this.enableProgressGesture = true;
    this.vslideGesture = false;
    this.vslideGestureInFullscreen = true;
    this.nativeProps = {};
    this._duration = undefined;
    this._enableDanmu = false;
    this.isPlaying = false;
    this.isFirst = true;
    this.isFullScreen = false;
    this.fullScreenTimestamp = new Date().getTime();
    this.isMute = false;
  }
  componentWillLoad() {
    this._enableDanmu = this.enableDanmu;
    this.isMute = this.muted;
  }
  componentDidLoad() {
    var _a, _b;
    this.init();
    if (this.initialTime) {
      this.videoRef.currentTime = this.initialTime;
    }
    // 目前只支持 danmuList 初始化弹幕列表，还未支持更新弹幕列表
    (_b = (_a = this.danmuRef).sendDanmu) === null || _b === void 0 ? void 0 : _b.call(_a, this.danmuList);
    if (document.addEventListener) {
      document.addEventListener(screenFn.fullscreenchange, this.handleFullScreenChange);
    }
    if (this.videoRef && scene === 'iOS') {
      // NOTE: iOS 场景下 fullscreenchange 并不会在退出全屏状态下触发，仅 webkitpresentationmodechanged 与 webkitendfullscreen 可替代
      this.videoRef.addEventListener('webkitendfullscreen', this.handleFullScreenChange);
    }
  }
  componentDidRender() {
  }
  disconnectedCallback() {
    if (document.removeEventListener) {
      document.removeEventListener(screenFn.fullscreenchange, this.handleFullScreenChange);
    }
    if (this.videoRef && scene === 'iOS') {
      this.videoRef.removeEventListener('webkitendfullscreen', this.handleFullScreenChange);
    }
  }
  watchEnableDanmu(newVal) {
    this._enableDanmu = newVal;
  }
  watchSrc() {
    this.init();
  }
  async onDocumentTouchMove(e) {
    if (this.lastTouchScreenX === undefined || this.lastTouchScreenY === undefined)
      return;
    if (await this.controlsRef.getIsDraggingProgressBall())
      return;
    const gestureObj = this.analyzeGesture(e);
    if (gestureObj.type === 'adjustVolume') {
      this.toastVolumeRef.style.visibility = 'visible';
      const nextVolume = Math.max(Math.min(this.lastVolume - gestureObj.dataY, 1), 0);
      this.videoRef.volume = nextVolume;
      this.toastVolumeBarRef.style.width = `${nextVolume * 100}%`;
    }
    else if (gestureObj.type === 'adjustProgress') {
      this.isDraggingProgress = true;
      this.nextPercentage = Math.max(Math.min(this.lastPercentage + (gestureObj.dataX || 0), 1), 0);
      if (this.controls && this.showProgress) {
        this.controlsRef.setProgressBall(this.nextPercentage);
        this.controlsRef.toggleVisibility(true);
      }
      const duration = this.duration || this._duration;
      this.toastProgressTitleRef.innerHTML = `${formatTime(this.nextPercentage * duration)} / ${formatTime(duration)}`;
      this.toastProgressRef.style.visibility = 'visible';
    }
  }
  onDocumentTouchEnd() {
    var _a;
    if (this.gestureType === 'adjustVolume') {
      this.toastVolumeRef.style.visibility = 'hidden';
    }
    else if (this.gestureType === 'adjustProgress') {
      this.toastProgressRef.style.visibility = 'hidden';
    }
    if (this.isDraggingProgress) {
      this.isDraggingProgress = false;
      this.seek(this.nextPercentage * ((_a = this.duration) !== null && _a !== void 0 ? _a : this._duration));
    }
    this.gestureType = 'none';
    this.lastTouchScreenX = undefined;
    this.lastTouchScreenY = undefined;
  }
  async getHlsObject() {
    // Note: H5 端专属方法，获取 HLS 实例 fix #11894
    return this.hls;
  }
  /** 播放视频 */
  async play() {
    this._play();
  }
  /** 暂停视频 */
  async pause() {
    this._pause();
  }
  /** 停止视频 */
  async stop() {
    this._stop();
  }
  /** 跳转到指定位置 */
  async seek(position) {
    this._seek(position);
  }
  /** 进入全屏。若有自定义内容需在全屏时展示，需将内容节点放置到 video 节点内。 */
  async requestFullScreen() {
    this.toggleFullScreen(true);
  }
  /** 退出全屏 */
  async exitFullScreen() {
    this.toggleFullScreen(false);
  }
  render() {
    const { controls, autoplay, loop, muted, poster, objectFit, isFirst, isMute, isFullScreen, showCenterPlayBtn, isPlaying, _enableDanmu, showMuteBtn, danmuBtn, showFullscreenBtn, nativeProps } = this;
    const duration = this.duration || this._duration;
    const durationTime = formatTime(duration);
    return (h(Host, { class: classNames('taro-video-container', {
        'taro-video-type-fullscreen': isFullScreen
      }), onTouchStart: this.onTouchStartContainer, onClick: this.onClickContainer }, h("video", Object.assign({ class: 'taro-video-video', style: {
        'object-fit': objectFit
      }, ref: dom => {
        if (dom) {
          this.videoRef = dom;
        }
      }, autoplay: autoplay, loop: loop, muted: muted, poster: controls ? poster : undefined, playsinline: true, "webkit-playsinline": true, onPlay: this.handlePlay, onPause: this.handlePause, onEnded: this.handleEnded, onTimeUpdate: this.handleTimeUpdate, onError: this.handleError, onDurationChange: this.handleDurationChange, onProgress: this.handleProgress, onLoadedMetaData: this.handleLoadedMetaData }, nativeProps), "\u6682\u65F6\u4E0D\u652F\u6301\u64AD\u653E\u8BE5\u89C6\u9891"), h("taro-video-danmu", { ref: dom => {
        if (dom) {
          this.danmuRef = dom;
        }
      }, enable: _enableDanmu }), isFirst && showCenterPlayBtn && !isPlaying && (h("div", { class: 'taro-video-cover' }, h("div", { class: 'taro-video-cover-play-button', onClick: () => this.play() }), h("p", { class: 'taro-video-cover-duration' }, durationTime))), h("taro-video-control", { ref: dom => {
        if (dom) {
          this.controlsRef = dom;
        }
      }, controls: controls, currentTime: this.currentTime, duration: duration, isPlaying: this.isPlaying, pauseFunc: this._pause, playFunc: this._play, seekFunc: this._seek, showPlayBtn: this.showPlayBtn, showProgress: this.showProgress }, showMuteBtn && (h("div", { class: classNames('taro-video-mute', {
        'taro-video-type-mute': isMute
      }), onClick: this.toggleMute })), danmuBtn && (h("div", { class: classNames('taro-video-danmu-button', {
        'taro-video-danmu-button-active': _enableDanmu
      }), onClick: this.toggleDanmu }, "\u5F39\u5E55")), showFullscreenBtn && (h("div", { class: classNames('taro-video-fullscreen', {
        'taro-video-type-fullscreen': isFullScreen
      }), onClick: this.onClickFullScreenBtn }))), h("div", { class: 'taro-video-toast taro-video-toast-volume', ref: dom => {
        if (dom) {
          this.toastVolumeRef = dom;
        }
      } }, h("div", { class: 'taro-video-toast-title' }, "\u97F3\u91CF"), h("div", { class: 'taro-video-toast-icon' }), h("div", { class: 'taro-video-toast-value' }, h("div", { class: 'taro-video-toast-value-content', ref: dom => {
        if (dom) {
          this.toastVolumeBarRef = dom;
        }
      } }, h("div", { class: 'taro-video-toast-volume-grids' }, Array(10).fill(1).map(() => (h("div", { class: 'taro-video-toast-volume-grids-item' }))))))), h("div", { class: 'taro-video-toast taro-video-toast-progress', ref: dom => {
        if (dom) {
          this.toastProgressRef = dom;
        }
      } }, h("div", { class: 'taro-video-toast-title', ref: dom => {
        if (dom) {
          this.toastProgressTitleRef = dom;
        }
      } }))));
  }
  static get is() { return "taro-video-core"; }
  static get originalStyleUrls() {
    return {
      "$": ["./style/index.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["./style/index.css"]
    };
  }
  static get properties() {
    return {
      "src": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u8981\u64AD\u653E\u89C6\u9891\u7684\u8D44\u6E90\u5730\u5740"
        },
        "attribute": "src",
        "reflect": false
      },
      "duration": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u6307\u5B9A\u89C6\u9891\u65F6\u957F"
        },
        "attribute": "duration",
        "reflect": false
      },
      "controls": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u663E\u793A\u9ED8\u8BA4\u64AD\u653E\u63A7\u4EF6\uFF08\u64AD\u653E/\u6682\u505C\u6309\u94AE\u3001\u64AD\u653E\u8FDB\u5EA6\u3001\u65F6\u95F4\uFF09"
        },
        "attribute": "controls",
        "reflect": false,
        "defaultValue": "true"
      },
      "autoplay": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u81EA\u52A8\u64AD\u653E"
        },
        "attribute": "autoplay",
        "reflect": false,
        "defaultValue": "false"
      },
      "loop": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u5FAA\u73AF\u64AD\u653E"
        },
        "attribute": "loop",
        "reflect": false,
        "defaultValue": "false"
      },
      "muted": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u9759\u97F3\u64AD\u653E"
        },
        "attribute": "muted",
        "reflect": false,
        "defaultValue": "false"
      },
      "initialTime": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u6307\u5B9A\u89C6\u9891\u521D\u59CB\u64AD\u653E\u4F4D\u7F6E"
        },
        "attribute": "initial-time",
        "reflect": false,
        "defaultValue": "0"
      },
      "poster": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u89C6\u9891\u5C01\u9762\u7684\u56FE\u7247\u7F51\u7EDC\u8D44\u6E90\u5730\u5740\u6216\u4E91\u6587\u4EF6ID\uFF082.3.0\uFF09\u3002\u82E5 controls \u5C5E\u6027\u503C\u4E3A false \u5219\u8BBE\u7F6E poster \u65E0\u6548"
        },
        "attribute": "poster",
        "reflect": false
      },
      "objectFit": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'contain' | 'fill' | 'cover'",
          "resolved": "\"contain\" | \"cover\" | \"fill\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u5F53\u89C6\u9891\u5927\u5C0F\u4E0E video \u5BB9\u5668\u5927\u5C0F\u4E0D\u4E00\u81F4\u65F6\uFF0C\u89C6\u9891\u7684\u8868\u73B0\u5F62\u5F0F"
        },
        "attribute": "object-fit",
        "reflect": false,
        "defaultValue": "'contain'"
      },
      "showProgress": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u82E5\u4E0D\u8BBE\u7F6E\uFF0C\u5BBD\u5EA6\u5927\u4E8E 240 \u65F6\u624D\u4F1A\u663E\u793A"
        },
        "attribute": "show-progress",
        "reflect": false,
        "defaultValue": "true"
      },
      "showFullscreenBtn": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u663E\u793A\u5168\u5C4F\u6309\u94AE"
        },
        "attribute": "show-fullscreen-btn",
        "reflect": false,
        "defaultValue": "true"
      },
      "showPlayBtn": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u663E\u793A\u89C6\u9891\u5E95\u90E8\u63A7\u5236\u680F\u7684\u64AD\u653E\u6309\u94AE"
        },
        "attribute": "show-play-btn",
        "reflect": false,
        "defaultValue": "true"
      },
      "showCenterPlayBtn": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u663E\u793A\u89C6\u9891\u4E2D\u95F4\u7684\u64AD\u653E\u6309\u94AE"
        },
        "attribute": "show-center-play-btn",
        "reflect": false,
        "defaultValue": "true"
      },
      "showMuteBtn": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u663E\u793A\u9759\u97F3\u6309\u94AE"
        },
        "attribute": "show-mute-btn",
        "reflect": false,
        "defaultValue": "false"
      },
      "danmuList": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "[]",
          "resolved": "[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u5F39\u5E55\u5217\u8868"
        }
      },
      "danmuBtn": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u663E\u793A\u5F39\u5E55\u6309\u94AE"
        },
        "attribute": "danmu-btn",
        "reflect": false,
        "defaultValue": "false"
      },
      "enableDanmu": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u5C55\u793A\u5F39\u5E55"
        },
        "attribute": "enable-danmu",
        "reflect": false,
        "defaultValue": "false"
      },
      "enablePlayGesture": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u5F00\u542F\u64AD\u653E\u624B\u52BF\uFF0C\u5373\u53CC\u51FB\u5207\u6362\u64AD\u653E/\u6682\u505C"
        },
        "attribute": "enable-play-gesture",
        "reflect": false,
        "defaultValue": "false"
      },
      "enableProgressGesture": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u5F00\u542F\u63A7\u5236\u8FDB\u5EA6\u7684\u624B\u52BF"
        },
        "attribute": "enable-progress-gesture",
        "reflect": false,
        "defaultValue": "true"
      },
      "vslideGesture": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u5728\u975E\u5168\u5C4F\u6A21\u5F0F\u4E0B\uFF0C\u662F\u5426\u5F00\u542F\u4EAE\u5EA6\u4E0E\u97F3\u91CF\u8C03\u8282\u624B\u52BF"
        },
        "attribute": "vslide-gesture",
        "reflect": false,
        "defaultValue": "false"
      },
      "vslideGestureInFullscreen": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u5728\u5168\u5C4F\u6A21\u5F0F\u4E0B\uFF0C\u662F\u5426\u5F00\u542F\u4EAE\u5EA6\u4E0E\u97F3\u91CF\u8C03\u8282\u624B\u52BF"
        },
        "attribute": "vslide-gesture-in-fullscreen",
        "reflect": false,
        "defaultValue": "true"
      },
      "nativeProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{}",
          "resolved": "{}",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "_duration": {},
      "_enableDanmu": {},
      "isPlaying": {},
      "isFirst": {},
      "isFullScreen": {},
      "fullScreenTimestamp": {},
      "isMute": {}
    };
  }
  static get events() {
    return [{
        "method": "onPlay",
        "name": "play",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "onPause",
        "name": "pause",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "onEnded",
        "name": "ended",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "onTimeUpdate",
        "name": "timeupdate",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "onError",
        "name": "error",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "onFullScreenChange",
        "name": "fullscreenchange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "onProgress",
        "name": "progress",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "onLoadedMetaData",
        "name": "loadedmetadata",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "getHlsObject": {
        "complexType": {
          "signature": "() => Promise<HLS>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            },
            "HLS": {
              "location": "global"
            }
          },
          "return": "Promise<Hls>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "play": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "\u64AD\u653E\u89C6\u9891",
          "tags": []
        }
      },
      "pause": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "\u6682\u505C\u89C6\u9891",
          "tags": []
        }
      },
      "stop": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "\u505C\u6B62\u89C6\u9891",
          "tags": []
        }
      },
      "seek": {
        "complexType": {
          "signature": "(position: number) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "\u8DF3\u8F6C\u5230\u6307\u5B9A\u4F4D\u7F6E",
          "tags": []
        }
      },
      "requestFullScreen": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "\u8FDB\u5165\u5168\u5C4F\u3002\u82E5\u6709\u81EA\u5B9A\u4E49\u5185\u5BB9\u9700\u5728\u5168\u5C4F\u65F6\u5C55\u793A\uFF0C\u9700\u5C06\u5185\u5BB9\u8282\u70B9\u653E\u7F6E\u5230 video \u8282\u70B9\u5185\u3002",
          "tags": []
        }
      },
      "exitFullScreen": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "\u9000\u51FA\u5168\u5C4F",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "enableDanmu",
        "methodName": "watchEnableDanmu"
      }, {
        "propName": "src",
        "methodName": "watchSrc"
      }];
  }
  static get listeners() {
    return [{
        "name": "touchmove",
        "method": "onDocumentTouchMove",
        "target": "document",
        "capture": false,
        "passive": true
      }, {
        "name": "touchend",
        "method": "onDocumentTouchEnd",
        "target": "document",
        "capture": false,
        "passive": true
      }, {
        "name": "touchcancel",
        "method": "onDocumentTouchEnd",
        "target": "document",
        "capture": false,
        "passive": true
      }];
  }
}

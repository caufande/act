import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const VideoDanmu = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.list = [];
    this.danmuElList = [];
    this.currentTime = 0;
    this.enable = false;
    this.danmuList = [];
  }
  ensureProperties(danmu) {
    const clonedDanmu = Object.assign({}, danmu);
    if (!('time' in danmu)) {
      clonedDanmu.time = this.currentTime;
    }
    clonedDanmu.key = Math.random();
    clonedDanmu.bottom = `${Math.random() * 90 + 5}%`;
    return clonedDanmu;
  }
  async sendDanmu(danmuList = []) {
    if (Array.isArray(danmuList)) {
      this.list = [
        ...this.list,
        ...danmuList.map(danmu => this.ensureProperties(danmu))
      ];
    }
    else {
      const danmu = danmuList;
      this.list = [
        ...this.list,
        Object.assign({}, this.ensureProperties(danmu))
      ];
    }
  }
  async tick(currentTime) {
    this.currentTime = currentTime;
    if (!this.enable)
      return;
    const danmuList = this.list;
    /**
     * @todo 这个判断对拖拽进度的处理不严谨
     */
    const newDanmuList = danmuList.filter(({ time }) => {
      return currentTime - time < 4 && currentTime > time;
    });
    let shouldUpdate = false;
    const oldDanmuList = this.danmuList;
    if (newDanmuList.length !== oldDanmuList.length) {
      shouldUpdate = true;
    }
    else {
      shouldUpdate = newDanmuList.some(({ key }) => {
        return oldDanmuList.every((danmu) => {
          return key !== danmu.key;
        });
      });
    }
    if (shouldUpdate) {
      this.danmuList = newDanmuList;
    }
  }
  componentDidUpdate() {
    requestAnimationFrame(() => {
      setTimeout(() => {
        const danmuElList = this.danmuElList.splice(0);
        danmuElList.forEach(danmu => {
          danmu.style.left = '0';
          danmu.style.webkitTransform = 'translateX(-100%)';
          danmu.style.transform = 'translateX(-100%)';
        });
      });
    });
  }
  render() {
    if (!this.enable)
      return '';
    return (h(Host, { class: 'taro-video-danmu' }, this.danmuList.map(({ text, color, bottom, key }) => (h("p", { class: 'taro-video-danmu-item', key: key, style: {
        color,
        bottom
      }, ref: ref => {
        if (ref) {
          this.danmuElList.push(ref);
        }
      } }, text)))));
  }
}, [0, "taro-video-danmu", {
    "enable": [4],
    "danmuList": [32],
    "sendDanmu": [64],
    "tick": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-video-danmu"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-video-danmu":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, VideoDanmu);
      }
      break;
  } });
}

export { VideoDanmu as V, defineCustomElement as d };

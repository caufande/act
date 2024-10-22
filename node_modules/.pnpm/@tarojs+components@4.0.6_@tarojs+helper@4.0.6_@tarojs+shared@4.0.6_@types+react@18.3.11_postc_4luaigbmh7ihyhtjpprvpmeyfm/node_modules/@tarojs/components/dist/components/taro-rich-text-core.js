import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const indexCss = "taro-rich-text-core{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}taro-rich-text-core[selectable=true],taro-rich-text-core[user-select=true]{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;display:block}taro-rich-text-core[space]{white-space:pre-wrap}taro-rich-text-core[space=ensp]{word-spacing:.5em}taro-rich-text-core[space=nbsp]{word-spacing:1em}";

const RichText = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.renderNode = (node) => {
      if ('type' in node && node.type === 'text') {
        // nonsupport Html Entries
        const content = (node.text || '').replace(/&nbsp;/g, '\u00A0');
        return content;
      }
      else if ('name' in node && node.name) {
        const { name, attrs, children } = node;
        const attributes = {};
        let childList = [];
        if (attrs && typeof attrs === 'object') {
          for (const key in attrs) {
            const val = attrs[key];
            if (key === 'style' && typeof val === 'string') {
              // stencil JSX style props only support object
              const styles = val
                .split(';')
                .map(item => item.trim())
                .filter(item => item);
              const styleObj = {};
              styles.forEach(item => {
                if (!item)
                  return;
                const res = /(.+): *(.+)/g.exec(item);
                if (!res)
                  return;
                const [, name, value] = res;
                const styleName = name.replace(/-([a-z])/g, (...args) => args[1].toUpperCase());
                styleObj[styleName] = value;
              });
              if (Object.keys(styleObj).length) {
                attributes.style = styleObj;
              }
              continue;
            }
            attributes[key] = val;
          }
        }
        if (children && children.length) {
          childList = children.map(node => this.renderNode(node));
        }
        // @ts-ignore
        return h(name, attributes, childList);
      }
      return null;
    };
    this.nodes = undefined;
    this.selectable = false;
    this.userSelect = false;
    this.space = undefined;
  }
  render() {
    const { nodes, renderNode } = this;
    if (Array.isArray(nodes)) {
      return (h(Host, null, nodes.map(node => renderNode(node))));
    }
    else {
      return h(Host, { innerHTML: nodes });
    }
  }
  static get style() { return indexCss; }
}, [0, "taro-rich-text-core", {
    "nodes": [1],
    "selectable": [1028],
    "userSelect": [1028, "user-select"],
    "space": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-rich-text-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-rich-text-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, RichText);
      }
      break;
  } });
}

const TaroRichTextCore = RichText;
const defineCustomElement = defineCustomElement$1;

export { TaroRichTextCore, defineCustomElement };

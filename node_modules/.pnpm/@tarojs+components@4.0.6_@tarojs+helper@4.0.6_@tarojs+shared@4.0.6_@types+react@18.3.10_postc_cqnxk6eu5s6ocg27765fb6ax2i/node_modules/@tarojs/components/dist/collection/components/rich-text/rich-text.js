import { h, Host } from '@stencil/core';
export class RichText {
  constructor() {
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
  static get is() { return "taro-rich-text-core"; }
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
      "nodes": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Nodes",
          "resolved": "ElementType[] | string",
          "references": {
            "Nodes": {
              "location": "local"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "nodes",
        "reflect": false
      },
      "selectable": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "selectable",
        "reflect": false,
        "defaultValue": "false"
      },
      "userSelect": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "user-select",
        "reflect": false,
        "defaultValue": "false"
      },
      "space": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "keyof TextProps.TSpace",
          "resolved": "\"emsp\" | \"ensp\" | \"nbsp\" | undefined",
          "references": {
            "TextProps": {
              "location": "import",
              "path": "types"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "space",
        "reflect": false
      }
    };
  }
}

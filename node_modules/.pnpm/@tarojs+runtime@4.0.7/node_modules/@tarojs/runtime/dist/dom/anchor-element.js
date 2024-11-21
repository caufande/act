import { parseUrl } from '../bom/URL.js';
import { TaroElement } from './element.js';

class AnchorElement extends TaroElement {
    get href() {
        var _a;
        return (_a = this.props["href" /* AnchorElementAttrs.HREF */]) !== null && _a !== void 0 ? _a : '';
    }
    set href(val) {
        this.setAttribute("href" /* AnchorElementAttrs.HREF */, val);
    }
    get protocol() {
        var _a;
        return (_a = this.props["protocol" /* AnchorElementAttrs.PROTOCOL */]) !== null && _a !== void 0 ? _a : '';
    }
    get host() {
        var _a;
        return (_a = this.props["host" /* AnchorElementAttrs.HOST */]) !== null && _a !== void 0 ? _a : '';
    }
    get search() {
        var _a;
        return (_a = this.props["search" /* AnchorElementAttrs.SEARCH */]) !== null && _a !== void 0 ? _a : '';
    }
    get hash() {
        var _a;
        return (_a = this.props["hash" /* AnchorElementAttrs.HASH */]) !== null && _a !== void 0 ? _a : '';
    }
    get hostname() {
        var _a;
        return (_a = this.props["hostname" /* AnchorElementAttrs.HOSTNAME */]) !== null && _a !== void 0 ? _a : '';
    }
    get port() {
        var _a;
        return (_a = this.props["port" /* AnchorElementAttrs.PORT */]) !== null && _a !== void 0 ? _a : '';
    }
    get pathname() {
        var _a;
        return (_a = this.props["pathname" /* AnchorElementAttrs.PATHNAME */]) !== null && _a !== void 0 ? _a : '';
    }
    setAttribute(qualifiedName, value) {
        if (qualifiedName === "href" /* AnchorElementAttrs.HREF */) {
            const willSetAttr = parseUrl(value);
            for (const k in willSetAttr) {
                super.setAttribute(k, willSetAttr[k]);
            }
        }
        else {
            super.setAttribute(qualifiedName, value);
        }
    }
}

export { AnchorElement };
//# sourceMappingURL=anchor-element.js.map

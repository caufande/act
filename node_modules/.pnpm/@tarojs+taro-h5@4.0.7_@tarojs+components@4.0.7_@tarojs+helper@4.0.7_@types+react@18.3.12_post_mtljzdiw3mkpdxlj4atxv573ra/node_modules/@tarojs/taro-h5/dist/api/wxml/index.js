import { TaroH5IntersectionObserver } from './IntersectionObserver.js';
import { MediaQueryObserver } from './MediaQueryObserver.js';
export { NodesRef } from './nodesRef.js';
import { SelectorQuery } from './selectorQuery.js';

const createSelectorQuery = () => {
    return new SelectorQuery();
};
const createIntersectionObserver = (component, options) => {
    return new TaroH5IntersectionObserver(component, options);
};
const createMediaQueryObserver = () => {
    return new MediaQueryObserver();
};

export { createIntersectionObserver, createMediaQueryObserver, createSelectorQuery };
//# sourceMappingURL=index.js.map

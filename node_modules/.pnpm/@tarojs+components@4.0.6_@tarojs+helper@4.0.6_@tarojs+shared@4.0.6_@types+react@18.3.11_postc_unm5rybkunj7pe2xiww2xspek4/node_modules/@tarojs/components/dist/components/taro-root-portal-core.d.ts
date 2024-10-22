import type { Components, JSX } from "../types/components";

interface TaroRootPortalCore extends Components.TaroRootPortalCore, HTMLElement {}
export const TaroRootPortalCore: {
  prototype: TaroRootPortalCore;
  new (): TaroRootPortalCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

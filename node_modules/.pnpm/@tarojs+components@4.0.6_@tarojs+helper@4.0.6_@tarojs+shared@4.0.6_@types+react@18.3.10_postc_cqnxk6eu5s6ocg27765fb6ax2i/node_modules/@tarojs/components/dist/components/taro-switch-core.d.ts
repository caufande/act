import type { Components, JSX } from "../types/components";

interface TaroSwitchCore extends Components.TaroSwitchCore, HTMLElement {}
export const TaroSwitchCore: {
  prototype: TaroSwitchCore;
  new (): TaroSwitchCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

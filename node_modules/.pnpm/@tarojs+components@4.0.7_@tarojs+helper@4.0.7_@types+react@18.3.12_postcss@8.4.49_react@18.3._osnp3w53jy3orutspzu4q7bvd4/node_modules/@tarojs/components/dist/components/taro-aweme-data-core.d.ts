import type { Components, JSX } from "../types/components";

interface TaroAwemeDataCore extends Components.TaroAwemeDataCore, HTMLElement {}
export const TaroAwemeDataCore: {
  prototype: TaroAwemeDataCore;
  new (): TaroAwemeDataCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

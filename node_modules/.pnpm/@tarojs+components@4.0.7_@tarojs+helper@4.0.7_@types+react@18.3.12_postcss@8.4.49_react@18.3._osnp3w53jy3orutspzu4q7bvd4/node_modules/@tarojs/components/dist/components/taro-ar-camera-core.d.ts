import type { Components, JSX } from "../types/components";

interface TaroArCameraCore extends Components.TaroArCameraCore, HTMLElement {}
export const TaroArCameraCore: {
  prototype: TaroArCameraCore;
  new (): TaroArCameraCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

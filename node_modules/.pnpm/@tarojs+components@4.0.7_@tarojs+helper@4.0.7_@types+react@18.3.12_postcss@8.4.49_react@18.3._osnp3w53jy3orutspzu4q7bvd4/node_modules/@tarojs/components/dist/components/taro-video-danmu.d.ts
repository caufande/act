import type { Components, JSX } from "../types/components";

interface TaroVideoDanmu extends Components.TaroVideoDanmu, HTMLElement {}
export const TaroVideoDanmu: {
  prototype: TaroVideoDanmu;
  new (): TaroVideoDanmu;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

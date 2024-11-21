import type { Components, JSX } from "../types/components";

interface TaroDraggableSheetCore extends Components.TaroDraggableSheetCore, HTMLElement {}
export const TaroDraggableSheetCore: {
  prototype: TaroDraggableSheetCore;
  new (): TaroDraggableSheetCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

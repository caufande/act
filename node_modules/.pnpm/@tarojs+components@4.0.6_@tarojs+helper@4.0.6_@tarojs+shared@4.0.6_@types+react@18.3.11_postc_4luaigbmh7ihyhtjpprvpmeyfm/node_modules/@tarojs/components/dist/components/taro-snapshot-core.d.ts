import type { Components, JSX } from "../types/components";

interface TaroSnapshotCore extends Components.TaroSnapshotCore, HTMLElement {}
export const TaroSnapshotCore: {
  prototype: TaroSnapshotCore;
  new (): TaroSnapshotCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

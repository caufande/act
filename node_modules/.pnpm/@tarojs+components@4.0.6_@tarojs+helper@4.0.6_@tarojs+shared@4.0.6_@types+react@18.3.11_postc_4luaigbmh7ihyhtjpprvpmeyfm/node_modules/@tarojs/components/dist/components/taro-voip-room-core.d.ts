import type { Components, JSX } from "../types/components";

interface TaroVoipRoomCore extends Components.TaroVoipRoomCore, HTMLElement {}
export const TaroVoipRoomCore: {
  prototype: TaroVoipRoomCore;
  new (): TaroVoipRoomCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

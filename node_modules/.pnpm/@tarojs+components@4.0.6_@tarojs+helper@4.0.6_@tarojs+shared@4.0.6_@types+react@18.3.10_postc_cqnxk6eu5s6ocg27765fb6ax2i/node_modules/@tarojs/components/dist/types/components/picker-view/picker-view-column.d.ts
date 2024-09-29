import { EventEmitter } from '../../stencil-public-runtime';
export declare class PickerViewColumn {
  el: HTMLElement;
  col: string;
  initialPosition: string;
  paddingVertical: number;
  isInit: boolean;
  onChange: EventEmitter;
  onSelectStart: EventEmitter;
  onSelectEnd: EventEmitter;
  onTouchStart(): void;
  onTouchEnd(): void;
  componentDidLoad(): void;
  componentDidUpdate(): void;
  handleChange(): void;
  handleSelected: (...args: any[]) => void;
  render(): any;
}

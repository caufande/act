import { EventEmitter } from '../../stencil-public-runtime';
export declare class PickerView {
  private indicator;
  el: HTMLElement;
  indicatorStyle: string;
  indicatorClass: string;
  value: number[];
  maskStyle: string;
  maskClass: string;
  onChange: EventEmitter;
  onPickStart: EventEmitter;
  onPickEnd: EventEmitter;
  onPropsChange(): void;
  onSelect(e: CustomEvent<{
    curIndex: string;
    selectedIndex: string;
  }>): void;
  onSelectStart(e: CustomEvent<{
    curIndex: string;
    selectedIndex: string;
  }>): void;
  onPickerColEnd(e: CustomEvent<{
    curIndex: string;
    selectedIndex: string;
  }>): void;
  componentDidLoad(): void;
  handleValueChange(): void;
  componentDidRender(): void;
  render(): any;
}

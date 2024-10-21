import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
export type Mode = 'selector' | 'multiSelector' | 'time' | 'date';
export type Fields = 'day' | 'month' | 'year';
export type PickerValue = number | number[] | string;
export interface PickerText {
  okText?: string;
  cancelText?: string;
}
export interface PickerDate {
  _value: Date;
  _start: Date;
  _end: Date;
  _updateValue: [number, number, number];
}
export declare class Picker implements ComponentInterface {
  private index;
  private pickerDate;
  private overlay?;
  el: HTMLElement;
  mode: Mode;
  disabled: boolean;
  range: any[];
  rangeKey: string;
  value: PickerValue;
  start: string;
  end: string;
  fields: Fields;
  name: string;
  textProps: PickerText;
  pickerValue: PickerValue;
  height: number[];
  hidden: boolean;
  fadeOut: boolean;
  isWillLoadCalled: boolean;
  onChange: EventEmitter;
  onColumnChange: EventEmitter;
  onCancel: EventEmitter;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  onPropsChange(): void;
  handleProps(): void;
  showPicker: () => void;
  getHeightByIndex: () => number[];
  hidePicker: () => void;
  handleChange: () => void;
  handleColumnChange: (e: CustomEvent) => void;
  handleCancel: () => void;
  updateHeight: (height: number, columnId: string, needRevise?: boolean) => void;
  updateDay: (value: number, fields: number) => void;
  getSelector: () => any;
  getMultiSelector: () => any[];
  getTimeSelector: () => any[];
  getDateSelector: () => any[];
  render(): any;
}

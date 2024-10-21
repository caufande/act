import { ComponentInterface, Event, EventEmitter } from '../../stencil-public-runtime';
export declare class Checkbox implements ComponentInterface {
  private inputEl;
  name: string;
  value: string | number;
  color: string;
  id: string;
  checked: boolean;
  disabled: boolean;
  nativeProps: {};
  isWillLoadCalled: boolean;
  el: HTMLElement;
  watchId(newVal: any): void;
  onChange: EventEmitter;
  componentWillLoad(): void;
  componentDidRender(): void;
  handleChange: (e: Event) => void;
  render(): any;
}

import { ComponentInterface, Event, EventEmitter } from '../../stencil-public-runtime';
export declare class Radio implements ComponentInterface {
  private inputEl;
  name: string;
  value: string;
  id: string;
  checked: boolean;
  disabled: boolean;
  nativeProps: {};
  isWillLoadCalled: boolean;
  el: HTMLElement;
  watchChecked(newVal: any): void;
  watchId(newVal: any): void;
  onChange: EventEmitter;
  componentDidRender(): void;
  componentWillLoad(): void;
  handleClick: (e: Event) => void;
  render(): any;
}

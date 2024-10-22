import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
export declare class Switch implements ComponentInterface {
  private inputRef;
  type: string;
  checked: boolean;
  color: string;
  name: string;
  disabled: boolean;
  nativeProps: {};
  isWillLoadCalled: boolean;
  el: HTMLInputElement;
  function(newValue: boolean): void;
  onChange: EventEmitter;
  componentWillLoad(): void;
  componentDidLoad(): void;
  switchChange: (e: any) => void;
  render(): any;
}

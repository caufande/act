import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
export declare class Form implements ComponentInterface {
  #private;
  private form;
  private originalAppendChild;
  private originalInsertBefore;
  private originalReplaceChild;
  private originalRemoveChild;
  el: HTMLElement;
  onSubmit: EventEmitter;
  onButtonSubmit(e: Event): void;
  onButtonReset(e: Event): void;
  componentDidLoad(): void;
  componentDidRender(): void;
  getFormValue(): {};
  render(): any;
}

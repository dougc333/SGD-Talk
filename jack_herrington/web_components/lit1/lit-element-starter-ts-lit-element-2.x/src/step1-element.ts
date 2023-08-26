import {LitElement, html} from 'lit';
import { customElement,property } from 'lit/decorators'; 


@customElement('step1-element')
export class Step1Element extends LitElement {
  @property()
  version="0.0.0"

  protected render(): unknown {
    return html`
    <h4>First lit element</h4>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'step1-element': Step1Element;
  }
}

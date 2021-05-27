import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './InputElement-styles.js';
import bootstrap from "./styles/bootstrap";
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<input-element></input-element>
```

##styling-doc

@customElement input-element
*/
export class InputElement extends LitElement {
  static get is() {
    return 'input-element';
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('input-element-shared-styles'),
      bootstrap
    ];
  }

  static get properties() {
    return {
        value: { type: String },
        identifier: { type: String },
    };
  }

  get getInput() {
    return this.shadowRoot.querySelector("input");
  }

  constructor() {
      super();
      this.value = '';
  }

  update() {
      super.update();
      this.getInput.value = this.value;
  }

  _inputEvent(e) {
      let value = e.currentTarget.value;

      const inputEvent = new CustomEvent("input-event", {
          detail: { value, identifier: this.identifier },
          bubbles: true,
          composed: true,
      });

      this.dispatchEvent(inputEvent);
  }

  render() {
      return html`<input
          type="text"
          value="${this.value}"
          class="form-control mb-3"
          @input="${this._inputEvent}"
      />`;
  }
}

import { LitElement, css, html } from 'lit'
import style from './style_spinner.scss?inline';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(style);


export class Spinner extends LitElement {

  static get properties() {
    return {
    }
  }



  constructor() {
    super()
  }

  firstUpdated(){
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }


  render() {
    return html`
        <div class='spinner'></div>
    `;
  }

  
}

window.customElements.define('spinner-reload', Spinner)

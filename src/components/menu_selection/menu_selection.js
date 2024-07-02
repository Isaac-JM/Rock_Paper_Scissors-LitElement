import { LitElement, css, html } from 'lit'
import style from './style_menu_selection.scss?inline';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(style);


export class MenuSelection extends LitElement {

  static get properties() {
    return {
        disabled:{type:Boolean}
    }
  }



  constructor() {
    super()
    this.disabled=false;
  }

  firstUpdated(){
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }


  optionSelected(value){
    if(this.disabled===false){
    const event = new CustomEvent('optionSelected', {
        detail: value,
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    }
  }

  render() {
    return html`
            <div class="menu">
                <div style="${this.disabled?"background:gray; cursor: not-allowed;":""}" class="option"  @click="${(e)=>{this.optionSelected(1)}}"><img src="src/assets/tijeras.png"  class="img"/></div>
                <div style="${this.disabled?"background:gray; cursor: not-allowed;":""}"class="option" @click="${(e)=>{this.optionSelected(2)}}"><img src="src/assets/papel.png"  class="img"/></div>
                <div style="${this.disabled?"background:gray; cursor: not-allowed;":""}" class="option" @click="${(e)=>{this.optionSelected(3)}}"><img src="src/assets/roca.png"  class="img"/></div>
            </div>
    `;
  }

  
}

window.customElements.define('menu-selection', MenuSelection)

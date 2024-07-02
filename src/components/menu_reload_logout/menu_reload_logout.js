import { LitElement, css, html } from 'lit'
import style from './style_menu_reload_logout.scss?inline';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(style);


export class  MenuReloadLogout extends LitElement {

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


  reload(){
    const event = new CustomEvent('reload', {
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
  }

  logout=()=>{
    location.href="/home"
  }

  render() {
    return html`
            <div class="menu">
                <div class="option"  @click="${this.reload}"><img src="src/assets/reload.png"  class="img"/></div>
                <div class="option" @click="${this.logout}"><img src="src/assets/logout.png"  class="img"/></div>
            </div>
    `;
  }

  
}

window.customElements.define('menu-reload-logout', MenuReloadLogout)

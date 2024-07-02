import { LitElement, css, html } from 'lit'
import style from './style_home.scss?inline';
import '../../components/new_player/new_player'
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(style);


export class HomeView extends LitElement {

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
    <div class="container f-center">
      <new-player></new-player>
    </div>
    `;
  }

  
}

window.customElements.define('home-view', HomeView)

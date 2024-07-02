import { LitElement, css, html } from 'lit'
import { Router } from '@vaadin/router';
import './views/game/game.js'
import './views/home/home.js'
import style from './style.scss?inline';

const sheet = new CSSStyleSheet();
sheet.replaceSync(style);

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class App extends LitElement {

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

  firstUpdated() {
    super.firstUpdated();
    const router = new Router(this.shadowRoot.querySelector('#outlet'));
    router.setRoutes([
      { path: '/home', component: 'home-view' },
      { path: '/game', component: 'game-view' },
      { path: '(.*)', redirect: '/home' },
    ]);
  }

  render() {
    return html`
      <div id="outlet"></div> 
    `;
  }


  static get styles() {
    return css`
    :host{
    padding:0;
    margin:0;
    }`}
}

window.customElements.define('app-view', App)

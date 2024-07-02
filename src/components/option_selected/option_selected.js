import { LitElement, css, html } from 'lit'
import style from './style_option_selected.scss?inline';
import '../spinner/spinner'
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(style);


export class OptionSelected extends LitElement {

  static get properties() {
    return {
        countdownValue:{type:Boolean},
        optionSelected:{type:Number},
        winner:{type:String},
        name:{type:String}
    }
  }



  constructor() {
    super()
    this.countdownValue=false;
    this.optionSelected=0;
    this.winner=""
    this.name="Machine"

  }

  firstUpdated(){
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  imgSelected(value){

    switch(value){
        case 0:
            return "/src/assets/pregunta.png"
        case 1:
            return "/src/assets/tijeras.png"
        case 2:
            return "/src/assets/papel.png"
        case 3:
            return "/src/assets/roca.png"
    }
  }

  render() {

    return html`
    <div class="container" style="${this.winner}">
    ${this.countdownValue===false?
        html`<img class="img" src=${this.imgSelected(this.optionSelected)}/>`:
        html`<spinner-reload></spinner-reload>`
    }
      
        
    </div>
    <div style="text-align:center; margin-top:5px;">
        <span style="font-size:30px; color:white;">${this.name}</span>
    </div>

    `;
  }

  
}

window.customElements.define('option-selected', OptionSelected)

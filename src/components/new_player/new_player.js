import { LitElement, css, html } from 'lit'
import style from './style_new_player.scss?inline';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(style);


export class NewPlayer extends LitElement {

  static get properties() {
    return {
    }
  }



  constructor() {
    super()
    this.addEventListener('keyup', this.handleInputKeyUp.bind(this));
  }

  firstUpdated(){
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  handleInputKeyUp(event) {
    if (event.key === 'Enter') {
      this.newPlayer()
    }
  }

  
  newPlayer(){
    const player=this.shadowRoot.getElementById("player").value
    let players=[]
    if(player!=""){
      localStorage.setItem("actualPlayer",player)
      if( localStorage.getItem("players")){
        players=JSON.parse(localStorage.getItem("players"))
        if(players.find((res)=>res.name===player)==undefined){
          players.push({name:player,playerScore:0,machineScore:0})
          localStorage.setItem("players",JSON.stringify(players))
        }
      }else{
        localStorage.setItem("players",JSON.stringify([{name:player,playerScore:0,machineScore:0}]))
      }
        location.href="/game"
    }else{
        alert("Invalid user")
    }
   
  }

  render() {
    return html`
    <div class="container">
       <div class="f-center" style="padding:4px">
            <div style="width:100%,heigth:100%">
                </div><img src="/src/assets/piedra-papel-tijeras.png" style="width:50%; height:150px;"/></div>
                  <div class="f-center" style="padding:2px">
                  <div>
                    <div class="f-center" >
                     <span class="text-new-player" >Create new player</span>
                    </div>
                    <div>
                      <input id="player" class="text-input-new-player" type="text" >
                    </div>
                    <div class="f-center">
                      <button @click="${this.newPlayer}" class="button-new-player">Join</button>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
    `;
  }

  
}

window.customElements.define('new-player', NewPlayer)

import { LitElement, css, html } from 'lit'
import style from './style_game.scss?inline';
import '../../components/option_selected/option_selected.js'
import '../../components/menu_selection/menu_selection.js'
import '../../components/menu_reload_logout/menu_reload_logout.js'
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */

const sheet = new CSSStyleSheet();
sheet.replaceSync(style);

export class GameView extends LitElement {

  static get properties() {
    return {
      count: { type: Number },
      countdownValue: { type: Number },
      optionPlayerSelected: { type: Number },
      optionMachineSelected: { type: Number },
      playerWin: { type: String },
      machineWin: { type: String },
      playerScore:{type:Number},
      machineScore:{type:Number},
      disabledMenu:{type:Boolean}
    }
  }

  constructor() {
    super()
    this.count = 3;
    this.interval;
    this.countdownValue = false;
    this.optionPlayerSelected = 0;
    this.optionMachineSelected = 0;
    this.addEventListener("optionSelected", this.countdown)
    this.addEventListener("reload",this.resetAll)
    this.playerWin = ""
    this.machineWin = ""
    this.playerScore=0;
    this.machineScore=0;
    this.disabledMenu=false;

  }

  firstUpdated() {
    this.shadowRoot.adoptedStyleSheets = [sheet];
    let players=JSON.parse(localStorage.getItem("players"))

    players.map((res)=>{
      if(res.name===localStorage.getItem("actualPlayer")){
        this.playerScore=res.playerScore
        this.machineScore=res.machineScore
      }
    })
  }

  resetAll(){
    let players=JSON.parse(localStorage.getItem("players"))
    
    players=players.map((res)=>{
      if(res.name===localStorage.getItem("actualPlayer")){
        return {
          name:res.name,
          playerScore:0,
          machineScore:0
        }
      }
      return res
    })
    localStorage.setItem("players",JSON.stringify(players))
    this.count = 3;
    this.interval;
    this.countdownValue = false;
    this.optionPlayerSelected = 0;
    this.optionMachineSelected = 0;
    this.playerWin = ""
    this.machineWin = ""
    this.playerScore=0;
    this.machineScore=0;
    this.disabledMenu=false;
  }


  countdown(e) {
    this.disabledMenu=true;
    this.optionPlayerSelected = e.detail;
    this.optionMachineSelected = this.getMachineOption(1, 3)
    this.countdownValue = true;
    setTimeout(() => {

      this.interval = setInterval(() => {
        this.count--
      }, 1000);

    }, 200)

  }

  getMachineOption(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  update(changedProperties) {
    super.update(changedProperties);
    if (this.count === 0 && this.countdownValue===true) {
      this.countdownValue = false
      clearInterval(this.interval)
      this.winner()
      setTimeout(() => {
        this.optionPlayerSelected = 0;
        this.optionMachineSelected = 0;
        this.count = 3;
        this.playerWin = ""
        this.machineWin = ""
        this.disabledMenu=false;
      }, 1500)
    }

  }

  winner() {
    if (this.optionPlayerSelected === this.optionMachineSelected) {
      this.playerWin = "background-color:orange"
      this.machineWin = "background-color:orange"
    }

    if (this.optionPlayerSelected === 1 && this.optionMachineSelected === 2) {
      this.playerWinStyle()
       this.winnerScore("player")
    }

    if (this.optionPlayerSelected === 2 && this.optionMachineSelected === 1) {
       this.machineWinStyle()
       this.winnerScore("machine")
    }

    if (this.optionPlayerSelected === 2 && this.optionMachineSelected === 3) {
      this.playerWinStyle()
       this.winnerScore("player")
    }

    if (this.optionPlayerSelected === 3 && this.optionMachineSelected === 2) {
       this.machineWinStyle()
       this.winnerScore("machine")
    }

    if (this.optionPlayerSelected === 3 && this.optionMachineSelected === 1) {
      this.playerWinStyle()
      this.winnerScore("player")
    }

    if (this.optionPlayerSelected === 1 && this.optionMachineSelected === 3) {
      this.machineWinStyle()
      this.winnerScore("machine")
    }

  }

  playerWinStyle(){
      this.playerWin = "background-color:green"
      this.machineWin = "background-color:red"
  }

  machineWinStyle(){
     this.playerWin = "background-color:red"
      this.machineWin = "background-color:green"
  }

  winnerScore(player){
    let players=JSON.parse(localStorage.getItem("players"))

    players=players.map((res)=>{
      if(res.name===localStorage.getItem("actualPlayer")){
        return {
          name:res.name,
          playerScore:player==="player"?res.playerScore=res.playerScore+1:res.playerScore,
          machineScore:player==="machine"?res.machineScore=res.machineScore+1:res.machineScore,
        }
      }
      return res
    })
    player==="player"?
    this.playerScore=players.find((res)=>res.name===localStorage.getItem("actualPlayer")).playerScore:
    this.machineScore=players.find((res)=>res.name===localStorage.getItem("actualPlayer")).machineScore;

    localStorage.setItem("players",JSON.stringify(players))
  }



  render() {
    return html`
     <div class="container f-center">
     <menu-reload-logout></menu-reload-logout>
     <div style="width:100vw;">
        <div class="pc-vs-hu">
        <div>
            <div class="score">${this.playerScore}</div>
            <option-selected ?countdownValue=${this.countdownValue} optionSelected=${this.optionPlayerSelected}  winner="${this.playerWin}" name="${localStorage.getItem("actualPlayer")}"></option-selected>
        </div>
        <div>
        <div>

                  <div style="display:flex; justify-content:center; ${this.disabledMenu===false?"visibility:hidden":""}">
                  <span class="vs">${this.count}</span>
                  </div>
              
                  <div>
                      <span class="vs">VS</span>
                  </div>
            </div>
              
        </div>
           
        <div>
            <div class="score">${this.machineScore}</div>
            <option-selected ?countdownValue=${this.countdownValue} optionSelected=${this.optionMachineSelected} winner="${this.machineWin}"></option-selected>
        </div>

        </div>
          
          <div style="margin-top:5rem">
            <menu-selection  ?disabled="${this.disabledMenu}"></menu-selection>
          </div>
      </div>
     </div>
    `;
  }


  static get styles() {
    return css``
  }
}

window.customElements.define('game-view', GameView)

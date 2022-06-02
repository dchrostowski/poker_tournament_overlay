import corn from '../images/ace_of_corn.png'
import './spinny_stuff.css'

function SpinningCorn() {
    return (
        <div className="App">
        
        <p>
          </p>
          <div class="corn-container" style={{marginTop:100}}>
          <img src={corn} className="App-logo moving left-corn" alt="logo" />
          </div>
      </div>

    )
}

export default SpinningCorn
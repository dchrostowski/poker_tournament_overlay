import React, {useEffect} from 'react'

function ValheimDemo(props) {
    return  (
        
        <div>
            <b>Discord Demo</b>
          <form action="https://api.cornblaster.com/valheim" method="POST">
  
            <input type="text" name="name" placeholder="type something here for discord" />
  
            <button type="submit">
  
              Submit
  
            </button>
  
          </form>
  
        </div>
  
      );
    }

export default ValheimDemo

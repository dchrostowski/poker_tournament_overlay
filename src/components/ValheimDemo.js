import React, {useEffect} from 'react'

function ValheimDemo(props) {
    return  (
        
        <div>
            <b>Discord Demo</b>
          <form action="https://api.cornblaster.com/valheim" method="POST">
  
            <input type="text" name="name" placeholder="Viking Name" /><br/>
            <input type="text" name="email" placeholder="Email Address" /><br/>
            <input type="text" name="steam_id" placeholder="Steam ID" /><br/>

            
  
            <button type="submit">
  
              Submit
  
            </button>
  
          </form>
  
        </div>
  
      );
    }

export default ValheimDemo

import {connect} from 'react-redux'
import React, {useEffect} from 'react'
import {get_running_tournaments} from '../actions/actions'

import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";
import StandingsTicker from './StandingsTicker'
import StandingsTable from './StandingsTable'
import ValheimDemo from './ValheimDemo'
import OverlayHome from './OverlayHome'
import SpinningCorn from './SpinningCorn'
import SpinningAceOfCorn from './SpinningAceOfCorn'

import './start.css'


  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  

function StartPage(props) {
    
    const location = useLocation()
    let query = useQuery()

    const path = location.pathname

    if(path.indexOf('/aceofcorn') !== -1)  {
        return (<SpinningAceOfCorn/>)
    }

    
    if(path.indexOf('/corn') !== -1) {
        return (<SpinningCorn/>)
    }

    if(path.indexOf('valheim') !== -1) {
        
        return (<ValheimDemo />)
    }

    else if(path.indexOf('overlays') !== -1) {
        let sitePicked = 'none'
        if(path.indexOf('stock') !== -1) sitePicked = 'stockpokeronline.com'
        else if(path.indexOf('rounder') !== -1) sitePicked = 'roundercasino.com'
        console.log("hey")
        console.log(path.indexOf('/overlays'))
        return <OverlayHome site={sitePicked}/>
        
    }

     else {
        return (
            <div className="tournament-list-wrapper">
                <b>Useful links</b> <br/>
                <a href="/overlays">Standing Overlays for OBS / Twitch</a><br/>
                <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1qlNPiA-GZSrSKGnSeeP8GcCfeEfNmL0D22rJM8YsRrv-sgX3277et7D_jYBF14lUBsxZZKVSMBDa/pubhtml">StockPoker Tournament Stats</a><br/>
                <a href="https://twitch.tv/cornbl4ster">twitch.tv/cornbl4ster</a><br/>

                
                
                
            </div>
            
        )
        }
    }


export default StartPage

import React from 'react'
import './ticker.css'


import {
    useLocation
  } from "react-router-dom";

import ValheimDemo from './ValheimDemo'
import OverlayHome from './OverlayHome2'
import SpinningCorn from './SpinningCorn'
import SpinningAceOfCorn from './SpinningAceOfCorn'
import StandingsTicker from './StandingsTicker';

import './start.css'


  
  

function StartPage() {
    
    const location = useLocation()
    console.log(location)

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
        return <OverlayHome site={sitePicked}/>
        
    }

     else {
        return (
            <div>
            <StandingsTicker uid="RC_95667645" tstate="running" tournamentData={[]}/>    
            <div className="tournament-list-wrapper">
            
                <b>Useful links</b> <br/>
                <a href="/overlays">Standing Overlays for OBS / Twitch</a><br/>
                <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1qlNPiA-GZSrSKGnSeeP8GcCfeEfNmL0D22rJM8YsRrv-sgX3277et7D_jYBF14lUBsxZZKVSMBDa/pubhtml">StockPoker Tournament Stats</a><br/>
                <a href="https://twitch.tv/cornbl4ster">twitch.tv/cornbl4ster</a><br/>

                
                
                
            </div>
            </div>
            
        )
        }
    }


export default StartPage
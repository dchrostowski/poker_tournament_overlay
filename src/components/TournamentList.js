import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import SpinningAceOfCorn from './SpinningAceOfCorn'
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";
import StandingsTicker from './StandingsTicker.js'
import StandingsTable from './StandingsTable.js'
import {get_tournament_data} from '../actions/actions'

import './start.css'
import stockLogo from '../images/stockpokerLogo.png'
import rounderLogo from '../images/rounderLogo.png'

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function TournamentList(props) {
    const query = useQuery()
    const uid = query.get('uid')
    const widgetType = query.get('widgetType')
    const series = query.get('series') || false
    const tState = query.get('tstate') || false

    useEffect(() => {
        const tournState = tState || 'running'
        props.getTournamentData(uid,tournState)

    },[tState,uid])

    const renderLinks = (tournamentList) => {
    
        if(!tournamentList) {
            return <SpinningAceOfCorn/>
        }

        if(tournamentList.length === 0) {
            return (<ul><li>No tournaments found</li></ul>)
        }
        
        const links = tournamentList.map((tinfo) => {
            
            
            const {tournamentName, site,  uniqueId, tournamentState} = tinfo
            const href1=`/overlays/${site}/?uid=${uniqueId}&widgetType=ticker&tstate=${tournamentState}`
            const href2=`/overlays/${site}/?uid=${uniqueId}&widgetType=table&tstate=${tournamentState}`
            return (
                <ul>
                <li>
                <span>{tournamentName} ({site}): ( <Link to={href1}> Ticker</Link> | <Link to={href2}>Table</Link> )</span>
               </li>
               </ul>
            )
    
        })
    
        return links
    }

   

    if(uid && widgetType && tState) {
        if(widgetType === 'ticker') {
            return (
                <div style={{backgroundColor: '#3b3a39'}}>
                <StandingsTicker uid={uid} tstate={query.get('tstate')} tournamentData={props.tournamentData}/>
                </div>
            )
        

        }
        else if(widgetType === 'table') {
            return (
                <StandingsTable uid={uid} tstate={query.get('tstate')} tournamentData={props.tournamentData}/>
            )


        }
    }
    else {
        



    return (

        
        <div className="tournament-list-wrapper">
            { props.site === 'stock' && 
            <div style={{flex:1}}><a href="https://stockpokeronline.com"><img src={stockLogo}/></a></div>
            }
            {props.site === 'rounder' && <div style={{flex:1}}><a href="https://roundercaino.com"><img src={rounderLogo}/></a></div>}
        
                <div>
                <div>
                    <a href="/overlays"> &lt; Back</a><br/>
                    Pick a tournament and click the corresponding link to see the overlay.  Add a browser source in OBS studio, copy the link as the source URL.<br/>
                    
                <ul>
                <span style={{fontWeight:'bold', fontSize:48}}>Running Tournaments:</span>
                {renderLinks(props.runningTournaments.data)}
                </ul>
                </div>
                
                <div>
                    
                <ul>
                <span style={{fontWeight:'bold', fontSize:48}}>Registering Tournaments:</span>
                {renderLinks(props.registeringTournaments.data)}
                </ul>
                </div>
                </div>

        </div>
    )
    }









}

const mapStateToProps = state => ({
    tournamentData: state.tournament_data
  })
  
  const mapDispatchToProps = dispatch => ({
    getTournamentData: (uid,tstate) => {
      dispatch(get_tournament_data(uid,tstate))
    }
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(TournamentList);
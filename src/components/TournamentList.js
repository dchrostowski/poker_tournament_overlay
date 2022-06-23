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
import { get_tournament_data } from '../actions/actions'

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
        props.getTournamentData(uid, tournState)

    }, [tState, uid])

    const renderLinks = (tournamentList) => {

        if (!tournamentList) {
            return <SpinningAceOfCorn />
        }

        if (tournamentList.length === 0) {
            return (<ul><li>No tournaments found</li></ul>)
        }

        const links = tournamentList.map((tinfo) => {


            const { tournamentName, site, uniqueId, tournamentState, startDate } = tinfo


            
            const sdo = new Date(startDate?.$date)
            const today = new Date()
            let formatted

            

            if(sdo.toDateString() === today.toDateString()) {
                let dayDescriptor
                if(sdo.getHours() > 18 || sdo.getHours() <= 3) {
                    dayDescriptor = "(Tonight"
                }
                else {
                    dayDescriptor = "(Today"
                }

                formatted = `${dayDescriptor} at ${sdo.toLocaleTimeString()}`
            }
            else {
                let monthDay = ''
                const diffInMs =  Math.abs(sdo - today)
                const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
                if(diffInDays > 1.6) monthDay = `${sdo.getMonth()+1}/${sdo.getDate()}`
                
                 formatted = "(" + sdo.toLocaleString('default', {weekday: 'long'}) + ` ${monthDay} at ${sdo.toLocaleTimeString()} `
            }
            
            
            const href1 = `/overlays/${site}/?uid=${uniqueId}&widgetType=ticker&tstate=${tournamentState}`
            const href2 = `/overlays/${site}/?uid=${uniqueId}&widgetType=table&tstate=${tournamentState}`
            return (
                <div>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&amp;family=Teko&amp;display=swap')
                </style> 
                <ul>
                    <li>
                        <div style={{flex:1}}>
                        <div><span style={{fontFamily:"Times New Roman serif",fontSize:28, fontWeight:'bold'}}>{tournamentName}</span></div>
                        <div style={{align:'right',marginTop:-15, marginBottom:15,marginRight:0}}><span style={{fontSize:26, fontFamily:"Roboto condensed", fontWeight:'bold'}}>
                            {formatted} - [ <Link to={href1}>Ticker</Link> | <Link to={href2}>Table</Link> ] )</span></div>
                        </div>
                    </li>
                </ul>
                </div>
            )

        })

        return links
    }



    if (uid && widgetType && tState) {
        if (widgetType === 'ticker') {
            return (

                <StandingsTicker uid={uid} tstate={query.get('tstate')} />

            )


        }
        else if (widgetType === 'table') {
            return (
                <StandingsTable uid={uid} tstate={query.get('tstate')} />
            )


        }
    }
    else {




        return (
            <div>
                {props.randomTournament?.data?.uid &&
                    <StandingsTicker uid={props.randomTournament.data.uid} tstate={props.randomTournament.data.tstate} tournamentData={{}}></StandingsTicker>
                }
                <div className="tournament-list-wrapper">
                    {props.site === 'stock' &&
                        <div style={{ flex: 1 }}><a href="https://stockpokeronline.com"><img src={stockLogo} /></a></div>
                    }
                    {props.site === 'rounder' && <div style={{ flex: 1 }}><a href="https://roundercaino.com"><img src={rounderLogo} /></a></div>}

                    <div>
                        <div>
                            <a href="/overlays"> &lt; Back</a><br />
                            Pick a tournament and click the corresponding link to see the overlay.  Add a browser source in OBS studio, copy the link as the source URL.<br />
                            <ul style={{marginTop:0}}>
                            
                            </ul>
                                <ul style={{marginTop:-10}}>
                                <span style={{fontFamily: "Times New Roman", fontWeight: 'bold', fontSize: 40, marginLeft:-4 }}>Running Tournaments:</span>
                                {renderLinks(props.runningTournaments.data)}
                                </ul><br/>
                            <ul style={{marginTop:-10}}>
                                <span style={{fontFamily: "Times New Roman", fontWeight: 'bold', fontSize: 40, marginLeft:-4 }}>Registering Tournaments:</span>
                                {renderLinks(props.registeringTournaments.data)}
                            </ul>
                        </div>
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
    getTournamentData: (uid, tstate) => {
        dispatch(get_tournament_data(uid, tstate))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TournamentList);
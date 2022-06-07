import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import './start.css'
import {useLocation} from 'react-router-dom'
import TournamentList from './TournamentList'
import StandingsTicker from './StandingsTicker'
import { get_registering_tournaments, get_running_tournaments } from '../actions/actions'


const getListTournamentProps = (path) => {

    if(path.indexOf('/overlays/stock') !== -1) {
        return {
            site:'stockpokeronline.com',
            prefix:'SPO',
            nickName: 'stock',
        }
    }

    else if(path.indexOf('/overlays/rounder') !== -1) {
        return {
            site:'roundercasino.com',
            prefix:'RC',
            nickName: 'rounder',
        }
    }

    return {site:'OverlayHome'}

}


function OverlayHome(props) {
    
    const location = useLocation()
    const path = location.pathname
    const listProps =  getListTournamentProps(path)

    useEffect(() => {

        props.getRunningTournaments(listProps.site)
        props.getRegisteringTournaments(listProps.site)
        
    },[])

    

    if(listProps.nickName === 'stock') {
        return(
            <TournamentList randomTournament={props.randomTournament} site={listProps.nickName} runningTournaments={props.runningTournaments} registeringTournaments={props.registeringTournaments}></TournamentList>
        )
        
    }

    else if(listProps.nickName === 'rounder') {
        return(
            <TournamentList randomTournament={props.randomTournament} site={listProps.nickName} runningTournaments={props.runningTournaments} registeringTournaments={props.registeringTournaments}></TournamentList>
        )
        
    }
    else {
        return ( 
            
            <div>
                {props.randomTournament?.data?.uid &&
                <StandingsTicker uid={props.randomTournament.data.uid} tstate={props.randomTournament.data.tstate} tournamentData={{}}></StandingsTicker>
                }
            <div className="tournament-list-wrapper">
            
            <span><b>Choose a site</b> <br/></span>
            
                <a href="/overlays/stock">StockPokerOnline</a><br/>
                <a href="/overlays/rounder">RounderCasino</a><br/>
                <a href="/">&lt;Back</a><br/>
            
            </div>
            </div>
            )    

    }
    
            
    
    



}

const mapStateToProps = state => ({
    runningTournaments: state.running_tournaments,
    registeringTournaments: state.registering_tournaments
})

const mapDispatchToProps = dispatch => ({
    getRunningTournaments: (site) => {
        dispatch(get_running_tournaments(site))
    },
    getRegisteringTournaments: (site) => {
        dispatch(get_registering_tournaments(site))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OverlayHome)
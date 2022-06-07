import React, { useEffect, useState } from 'react'
import Ticker from 'react-ticker'
import axios from 'axios'
import './ticker.css'
import { useLocation } from 'react-router-dom'


async function makeAPICall(uid, tState) {
    console.log('make api call')
    console.log(uid)
    console.log(tState)
    console.log("-------------------")

    if (uid && tState) {

        const uri = `https://api.cornblaster.com/pokerdata/${tState}/${uid}`
        const response = await axios.get(uri)
        return response.data
    }

}

const generateElementsRegistration = ((tourneyData) => {
    console.log("gen elements2")
    console.log(tourneyData.startDate)
    const startDate = new Date(tourneyData.startDate?.$date).toLocaleString()
    console.log(startDate)
    const messages = [tourneyData.tournamentName, `Starting ${startDate}`, `${tourneyData.site}`, `Registerd players: ${tourneyData?.players?.length || 0}`]
    if (tourneyData?.players?.length > 0) {
        for (let i = 0; i < tourneyData.players.length; i++) {
            messages.push(`Entrant #${i + 1}: ${tourneyData.players[i].playerName}`)
        }
    }
    messages.push('', '', '')

    return messages.map((message) => {
        return (

            <p className="ticker-data">{message}</p>

        )
    })


})

const generateElementsRunning = ((data) => {
    let i = 0

    const playersStatus = `${data.players.filter(p => p.chips > 0).length} of ${data.players.length} players remain.`


    const startTickerData = [data.tournamentName, playersStatus]

    const beginTicker = startTickerData.map(d => {
        return (
            <div className="wrapper-data">
                <p className="ticker-data">{d}</p>
            </div>
        )
    })

    const players = data.players.map((d) => {
        i = i + 1
        if (d.chips > 0) {
            return (
                <div className="wrapper-data">
                    <p className="ticker-data">{i}.</p>
                    <p className="ticker-data">{d.playerName}:</p>
                    <p className="ticker-data">{d.chips}</p>
                </div>
            )
        }
        else {
            const eliminationStatus = d.totalPrize > 0 ? `Eliminated ($${d.totalPrize})` : 'Eliminated'

            return (
                <div className="wrapper-data">
                    <p className="ticker-data">{i}.</p>
                    <p className="ticker-data">{d.playerName}:</p>
                    <p className="ticker-data">${eliminationStatus}</p>
                </div>

            )
        }
    })


    return beginTicker.concat(players)
})


const StandingsData = (props) => {
    const [tourneyData, setTData] = useState("")
    const { uid, index, tState } = props
    



    useEffect(() => {
        
        async function fetchData(uid, tState) {
            const apiData = await makeAPICall(uid, tState)
            setTData(apiData)
        }
        fetchData(uid, tState)

    }, [uid, tState])


    let pElements = [<p className="ticker-data">No tournament data found. Find a ticker URL at &nbsp; <a style={{ color: 'white' }} href="https://cornblaster.com">cornblaster.com</a>.</p>]

    try {
        

        if (tourneyData !== null && tourneyData.tournamentState === 'registering') {
            pElements = generateElementsRegistration(tourneyData)

        }

        else if (tourneyData != null && tourneyData.hasOwnProperty('players') && tourneyData.players.length > 0) {
            pElements = generateElementsRunning(tourneyData)
        }

    } catch (err) {
        console.log('hi')
    }



    console.log('here"')

    console.log(pElements)
    let moddedIndex = (index.index % pElements.length) || 0

    return (
        <div className="wrapper-data">{pElements[moddedIndex]}</div>
    )



}




function StandingsTicker(props) {
    const { uid, tstate } = props
    console.log("HHDHDHDHHD")
    console.log(tstate)
    console.log(props.tournamentData)



    return (
        <div style={{backgroundColor: '#3b3a39'}}>
        <Ticker offset="run-in" speed={5}>
            {(index) => <StandingsData index={index} tState={tstate} uid={uid} />}
        </Ticker>
        </div>
    )


}


export default StandingsTicker
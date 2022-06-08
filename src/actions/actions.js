import axios from 'axios'

import {GET_RUNNING_TOURNAMENTS, GET_REGISTERING_TOURNAMENTS, GET_TOURNAMENT_DATA, GET_RANDOM_TOURNAMENT} from './constants'


export function get_running_tournaments(site) {
    const request = axios.get(`https://api.cornblaster.com/pokerdata/${site}/running`)

    return {
        type: GET_RUNNING_TOURNAMENTS,
        payload: request
    }
}

export function get_registering_tournaments(site) {
    const request = axios.get(`https://api.cornblaster.com/pokerdata/${site}/registering`)

    return {
        type: GET_REGISTERING_TOURNAMENTS,
        payload: request
    }
}

export function get_tournament_data(uid,tstate) {

    const request = axios.get(`https://api.cornblaster.com/pokerdata/${tstate}/${uid}`)
    return {
        type: GET_TOURNAMENT_DATA,
        payload: request
    }
}

export function get_spo_tournament_data() {
    const request = axios.get('https://api.dev.proxycrawler.com/spo_tournament_standings')
    return {
        type: GET_TOURNAMENT_DATA,
        payload: request
    }

}

export function get_random_tournament() {
    const request = axios.get('https://api.cornblaster.com/pokerdata/random_uid')
    return {
        type: GET_RANDOM_TOURNAMENT,
        payload: request
    }
}



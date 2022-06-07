import {
    GET_REGISTERING_TOURNAMENTS,
    GET_RUNNING_TOURNAMENTS,
    GET_TOURNAMENT_DATA,
    GET_RANDOM_TOURNAMENT
} from '../actions/constants'


export const get_tournament_data = (state = {}, action) => {
    switch(action.type) {
        case GET_TOURNAMENT_DATA + '_PENDING': {
            return {...state, isLoading: true, isError: false, errorMessage: null}
        }

        case GET_TOURNAMENT_DATA + '_FULFILLED': {
            return {
                ...state, 
                isLoading: false, 
                isError: false, 
                errorMessage: null, 
                data: action.payload.data}
            }
        

        case GET_TOURNAMENT_DATA + "_REJECTED": {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: "something went wrong"
            }
        }
        default: 
            return state;
    
    }
}


export const get_random_tournament = (state = {}, action) => {
    switch(action.type) {
        case GET_RANDOM_TOURNAMENT + '_PENDING': {
            return {...state, isLoading: true, isError: false, errorMessage: null}
        }

        case GET_RANDOM_TOURNAMENT + '_FULFILLED': {
            return {
                ...state, 
                isLoading: false, 
                isError: false, 
                errorMessage: null, 
                data: action.payload.data}
            }
        

        case GET_RANDOM_TOURNAMENT + "_REJECTED": {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: "something went wrong"
            }
        }
        default: 
            return state;
    
    }
}


export const get_running_tournaments = (state = {}, action) => {
    switch(action.type) {
        case GET_RUNNING_TOURNAMENTS + '_PENDING': {
            return {...state, isLoading: true, isError: false, errorMessage: null}
        }

        case GET_RUNNING_TOURNAMENTS + '_FULFILLED': {
            return {
                ...state, 
                isLoading: false, 
                isError: false, 
                errorMessage: null, 
                data: action.payload.data}
            }
        

        case GET_RUNNING_TOURNAMENTS + "_REJECTED": {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: "something went wrong"
            }
        }
        default: 
            return state;
    
    }
}




export const get_registering_tournaments = (state = {}, action) => {
    switch(action.type) {
        case GET_REGISTERING_TOURNAMENTS + '_PENDING': {
            return {...state, isLoading: true, isError: false, errorMessage: null}
        }

        case GET_REGISTERING_TOURNAMENTS + '_FULFILLED': {
            return {
                ...state, 
                isLoading: false, 
                isError: false, 
                errorMessage: null, 
                data: action.payload.data}
            }
        

        case GET_REGISTERING_TOURNAMENTS + "_REJECTED": {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: "something went wrong"
            }
        }
        default: 
            return state;
    
    }
}
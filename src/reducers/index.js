import { combineReducers } from 'redux';
import { 
  get_tournament_data,
  get_registering_tournaments,
  get_running_tournaments
} from './reducers'

export default combineReducers({
  tournament_data: get_tournament_data,
  running_tournaments: get_running_tournaments,
  registering_tournaments: get_registering_tournaments,
});

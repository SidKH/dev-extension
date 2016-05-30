import { ListingReducer } from './listing/listing-reducer.js';
import { InfoBoxReducer } from './infobox/infobox-reducer.js';

function ViewerReducer(state = {}, action) {
  console.log(action);
  return {
    hp: HelpersReducer(state.hp, action),
    infoBox: InfoBoxReducer(state.infoBox, action),
    listing: ListingReducer(state.listing, action)
  }
}

function HelpersReducer(state, action) {
  switch (action.type) {
    case 'START_LOADER': {
      return Object.assign({}, state, {loading: true});
    }
    case 'STOP_LOADER': {
      return Object.assign({}, state, {loading: false});
    }
    default:
      return state || {loading: false};
  }
}

export { ViewerReducer }
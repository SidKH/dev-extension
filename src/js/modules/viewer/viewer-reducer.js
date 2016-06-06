import { ListingReducer } from './listing/listing-reducer.js';
import { InfoBoxReducer } from './infobox/infobox-reducer.js';

function ViewerReducer(state = {}, action) {
  
  // It will console ALL application action which is just AWESOME for debugging
  console.log(action);

  return {
    hp: HelpersReducer(state.hp, action),
    infoBox: InfoBoxReducer(state.infoBox, action),
    listing: ListingReducer(state.listing, action)
  }
}

/**
 * Reducer for helpers components like loader and others
 */
function HelpersReducer(state, action) {
  switch (action.type) {
    
    // Starting loader
    case 'START_LOADER': {
      return Object.assign({}, state, {loading: true});
    }
    
    // Stopping loader
    case 'STOP_LOADER': {
      return Object.assign({}, state, {loading: false});
    }
    
    // Return default state
    default:
      return state || {loading: false};
  }
}

export { ViewerReducer }
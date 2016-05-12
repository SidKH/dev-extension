import { ListingReducer } from './listing/listing-reducer.js';

function ViewerReducer(state = {}, action) {
  return {
    listing: ListingReducer(state.listing, action)
  }
}

export { ViewerReducer }
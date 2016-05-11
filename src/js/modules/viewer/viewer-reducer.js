import { FiltersReducer } from './filters/filters-reducer.js';
import { ListingReducer } from './listing/listing-reducer.js';

function ViewerReducer(state = {}, action) {
  return {
    filters: FiltersReducer(state.filters, action),
    listing: ListingReducer(state.listing, action)
  }
}

export { ViewerReducer }
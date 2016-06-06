import { setInfoBoxContent, unsetInfoBoxContent } from './infobox/infobox-actions';
import { setInfoBoxView, unsetInfoBoxView } from './listing/listing-actions';

/**
 * Getting data from the url using GET method
 *  Started the loader when sending requests
 *  and remove it when get response or error
 */
export function getData (url) {
  window.store.dispatch(startLoader());
  return $.get(url).always(() => {
    window.store.dispatch(stopLoader());
  });
}

/**
 * Starting loader
 */
export function startLoader() {
  return { type: 'START_LOADER' }
}

/**
 * Stopping loader
 */
export function stopLoader() {
  return { type: 'STOP_LOADER' }
}

/**
 * Setting infoBox window for both
 *  infobox module and listing module
 * @param {Number} - index of the element in viewable data list
 */
export function setInfoBox(index) {
  return function (dispatch, getState) {
    let state = getState();
    let item = state.listing.viewData.list[index];
    dispatch(setInfoBoxContent(item.info));
    dispatch(setInfoBoxView(item.id));
  }
}

/**
 * Closing infobox window for both
 *  infobox module and listing module
 */
export function closeInfoBox() {
  return function (dispatch) {
    dispatch(unsetInfoBoxContent());
    dispatch(unsetInfoBoxView());
  }
}
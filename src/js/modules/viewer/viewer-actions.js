import { setInfoBoxContent, unsetInfoBoxContent } from './infobox/infobox-actions';
import { setInfoBoxView, unsetInfoBoxView } from './listing/listing-actions';

export function getData (url) {
  window.store.dispatch(startLoader());
  return $.get(url).always(() => {
    window.store.dispatch(stopLoader());
  });
}

export function startLoader() {
  return { type: 'START_LOADER' }
}

export function stopLoader() {
  return { type: 'STOP_LOADER' }
}

export function setInfoBox(index) {
  return function (dispatch, getState) {
    let state = getState();
    let item = state.listing.viewData.list[index];
    dispatch(setInfoBoxContent(item.info));
    dispatch(setInfoBoxView(item.id));
  }
}

export function closeInfoBox() {
  return function (dispatch) {
    dispatch(unsetInfoBoxContent());
    dispatch(unsetInfoBoxView());
  }
}
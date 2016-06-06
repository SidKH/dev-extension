export function setInfoBoxContent(data) {
  return {
    type: 'SET_INFOBOX_CONTENT',
    data
  }
}

export function unsetInfoBoxContent() {
  return function (dispatch) {
    dispatch({type: 'UNSET_INFOBOX_CONTENT'});
    dispatch(setTab(0));
  }
}

export function setTab(index) {
  return {
    type: 'SET_TAB',
    index
  }
}
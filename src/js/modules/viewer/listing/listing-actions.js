export function setNewRequest(id) {
  return function (dispatch) {
    dispatch({
      type: 'SET_NEW_REQUEST',
      id
    });
    dispatch(setEntriesRemote());
  }
}

export function setEntriesRemote() {
  return function (dispatch, getState) {
    let store = getState();
    var url = store.listing.reqList.filter(function (obj) {
      return obj.id === store.listing.currentReq;
    })[0].details;
    $.get(url).then(function (data) {
      dispatch(setEntries(data));
    });
  }
}

export function setEntries(data) {
  return {
    type: 'SET_REQUEST_ENTRIES',
    data
  }
}

export function sortEntries(sortField, sortType) {
  return function (dispatch) {
    dispatch({
      type: 'SORT_ENTRIES',
      sortField,
      sortType
    });
    dispatch(setEntries());
  }
}

export function filterEntries(filterType) {
  return function (dispatch) {
    dispatch({
      type: 'FILTERING_ENTRIES',
      filterType
    });
    dispatch(setEntries());
  }
}

export function filterText(txt) {
  return function (dispatch) {
    dispatch({
      type: 'FILTERING_ENTRIES_TEXT',
      txt
    });
    dispatch(setEntries());
  }
}
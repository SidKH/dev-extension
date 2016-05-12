export function setEntries() {
  return {
    type: 'SET_REQUEST_ENTRIES'
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
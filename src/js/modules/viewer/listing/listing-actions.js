import { getData } from '../viewer-actions';

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
    getData(url).then(function (data) {
      dispatch(filterEntries('foo'));
      dispatch(setCategories(data));
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

export function setCategories(data) {
  var categories = data.map(function (obj) {
    return obj.category;
  });
  return {
    type: 'SET_CATEGORIES',
    categories
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

export function filterEntries(filterType, update) {
  return function (dispatch) {
    dispatch({
      type: 'FILTERING_ENTRIES',
      filterType
    });
    update && dispatch(setEntries())
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

export function getInfo(index) {
  return {
    type: 'GET_INFO',
    index
  }
}
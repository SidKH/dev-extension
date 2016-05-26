import HP from '../../../helpers.js';
import Data from './data.json';
import reqList from './requests-listing.json';

// ToDo: Add total time to the select
// ToDo: Add timeline

var reqs = {
  sort: {},
  headers: [],
  filter: '',
  filterText: '',
  currentReq: false,
  reqList: reqList,
  categories: [],
  data: [],
  viewData: {
    headers: [],
    list: []
  }
}

function ListingReducer(state = reqs, action) {
  switch (action.type) {
    case 'SET_NEW_REQUEST': {
      return Object.assign(state, {currentReq: action.id});
    }
    case 'SET_REQUEST_ENTRIES': {
      return middlewares(Object.assign(state, {data: action.data || [...state.data]}));
    }
    case 'SET_CATEGORIES': {
      return Object.assign(state, {
        categories: action.categories
      });
    }
    case 'SORT_ENTRIES': {
      let sortType = action.sortType;
      if (!action.sortType) {
        if (state.sort.sortField === action.sortField) {
          sortType = state.sort.sortType === 'asc' ? 'desc' : 'asc';
        } else {
          sortType = 'asc';
        }
      }
      return Object.assign(state, {
        sort: {
          sortField: action.sortField,
          sortType: sortType
        }
      })
    }
    case 'FILTERING_ENTRIES': {
      if (action.filterType === state.filter) { return state; }
      return Object.assign(state, {
        filter: action.filterType
      });
    }
    case 'FILTERING_ENTRIES_TEXT': {
      return Object.assign(state, {
        filterText: action.txt
      });
    }
    default:
      return state;
  }
}

function middlewares(obj) {
  return sorting(filterText(filtering(obj)));
}

function structure(state) {
  if (state.viewData.list[0] && state.viewData.list[0].timeline) {
    let min = Number.MAX_SAFE_INTEGER;
    let max = 0;
    let data = state.data.filter(function (el) {
      return el.category.slug === state.filter;
    })[0].data;
    data.forEach(function (el) {
      min = el.timeline.from < min ? el.timeline.from : min;
      max = el.timeline.to > max ? el.timeline.to : max;
    });
    let list = [...state.viewData.list];
    list.forEach(function (el) {
      el.timeline.min = min;
      el.timeline.max = max;
    });
    return Object.assign(state, {viewData: Object.assign(state.viewData, {list: list})});
  }
  return state;
}

function sorting(state) {
  if (!state.sort.sortField) { return state; }
  let data = [...state.viewData.list];
  data.sort(function (a, b) {
    a = a[state.sort.sortField];
    b = b[state.sort.sortField];
    if (typeof a === 'object') {
      a = a.title;
      b = b.title;
    }
    if (state.sort.sortType === 'asc') {
      if (typeof a === 'string') {
        return (a > b) - (a < b)
      } else if (typeof a === 'number') {
        return a - b;
      }
    } else {
      if (typeof a === 'string') {
        return (a < b) - (a > b);
      } else if (typeof a === 'number') {
        return b - a;
      }
      return b - a;
    }
  });
  return Object.assign(state, {viewData: Object.assign(state.viewData, {list: data})});
}

function filtering(state) {
  let viewData = {};
  state.data.forEach(function (el) {
    if (state.filter === el.category.slug) {
      viewData = {
        list: [...el.data],
        headers: [...el.headers]
      }
    }
  });
  return Object.assign(state, {viewData: viewData});
}

function filterText(state) {
  let txt = state.filterText.trim();
  if (!txt) { return state; }
  let viewData = [];
  state.viewData.list.forEach(function (el) {
    HP.iterate(el, function (str) {
      if (str.toString().indexOf(txt) !== -1) {
        viewData.push(el);
        return true;
      }
    });
  });
  return Object.assign(state, {viewData: Object.assign(state.viewData, {list: viewData})});
}

export { ListingReducer }
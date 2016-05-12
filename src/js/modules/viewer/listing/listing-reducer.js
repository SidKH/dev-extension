import HP from '../../../helpers.js';
import Data from './data.json';

var reqs = {
  sort: {},
  filter: 'all',
  filterText: '',
  categories: [
    {"title": "Foo", "slug": "foo"},
    {"title": "Bar", "slug": "bar"},
    {"title": "Baz", "slug": "baz"}
  ],
  data: [],
  viewData: []
}

function ListingReducer(state = reqs, action) {
  switch (action.type) {
    case 'SET_REQUEST_ENTRIES': {
      return sorting(filterText(filtering(Object.assign(state, {data: Data}))));
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

function sorting(state) {
  if (!state.sort.sortField) { return state; }
  let sortCondition = state.sort.sortType === 'asc' ? [1, 0] : [0, 1];
  let data = [...state.viewData];
  data.sort(function (a, b) {
    return a[state.sort.sortField] > b[state.sort.sortField] ? sortCondition[0] : sortCondition[1];
  });
  return Object.assign(state, {viewData: data});
}

function filtering(state) {
  let viewData = [];
  state.data.forEach(function (el) {
    if (state.filter === el.category.slug || state.filter === 'all') {
      viewData.push(el);
    }
  });
  return Object.assign(state, {viewData: viewData});
}

function filterText(state) {
  let txt = state.filterText.trim();
  if (!txt) { return state; }
  let viewData = [];
  state.viewData.forEach(function (el) {
    HP.iterate(el, function (str) {
      if (str.toString().indexOf(txt) !== -1) {
        viewData.push(el);
        return true;
      }
    });
  });
  return Object.assign(state, {viewData: viewData});;
}

export { ListingReducer }
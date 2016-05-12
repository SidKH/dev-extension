var reqs = {
  sort: {
    sortType: 'asc',
    sortField: 'status'
  },
  filter: 'all',
  categories: [
    {"title": "Foo", "slug": "foo"},
    {"title": "Bar", "slug": "bar"},
    {"title": "Baz", "slug": "baz"}
  ],
  data: [],
  viewData: []
}

var data = [
  {
    "path": "http://google.com",
    "status": 200,
    "type": "Some type",
    "size": 1323333,
    "time": {
      "from": "1462887783",
      "to": "1462887783"
    },
    "category": {"title": "Foo", "slug": "foo"},
    "description": "http://my-api.com/123"
  },
  {
    "path": "http://facebook.com",
    "status": 304,
    "type": "Another type",
    "size": "330000",
    "time": {
      "from": "1462887783",
      "to": "1462887783"
    },
    "category": {"title": "Bar", "slug": "bar"},
    "description": "http://my-api.com/356"
  },
  {
    "path": "http://microsoft.com",
    "status": 500,
    "type": "Type",
    "size": 20000000,
    "time": {
      "from": "1462887783",
      "to": "1462887783"
    },
    "category": {"title": "Bar", "slug": "bar"},
    "description": "http://my-api.com/34"
  },
  {
    "path": "http://microsoft.com",
    "status": 600,
    "type": "Type",
    "size": 123000,
    "time": {
      "from": "1462887783",
      "to": "1462887783"
    },
    "category": {"title": "Bar", "slug": "bar"},
    "description": "http://my-api.com/34"
  },
  {
    "path": "http://microsoft.com",
    "status": 600,
    "type": "Type",
    "size": 123000,
    "time": {
      "from": "1462887783",
      "to": "1462887783"
    },
    "category": {"title": "Baz", "slug": "baz"},
    "description": "http://my-api.com/34"
  },
  {
    "path": "http://microsoft.com",
    "status": 600,
    "type": "Type",
    "size": 123000,
    "time": {
      "from": "1462887783",
      "to": "1462887783"
    },
    "category": {"title": "Baz", "slug": "baz"},
    "description": "http://my-api.com/34"
  },
  {
    "path": "http://microsoft.com",
    "status": 600,
    "type": "Type",
    "size": 123000,
    "time": {
      "from": "1462887783",
      "to": "1462887783"
    },
    "category": {"title": "Foo", "slug": "foo"},
    "description": "http://my-api.com/34"
  }
]

function ListingReducer(state = reqs, action) {
  switch (action.type) {
    case 'SET_REQUEST_ENTRIES': {
      return sorting(filtering(Object.assign(state, {data: data})));
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

export { ListingReducer }
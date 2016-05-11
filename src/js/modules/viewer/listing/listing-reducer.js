var reqs = {
  sort: {

  },
  data: [
    {
      "path": "http://google.com",
      "status": 200,
      "type": "Some type",
      "size": "200B",
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
      "size": "300B",
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
      "size": "2KB",
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
      "size": "2KB",
      "time": {
        "from": "1462887783",
        "to": "1462887783"
      },
      "category": {"title": "Bar", "slug": "bar"},
      "description": "http://my-api.com/34"
    }
  ]
}

function ListingReducer(state = reqs, action) {
  switch (action.type) {
    case 'SET_REQUEST_ENTRIES': {
      return Object.assign(state, {data: action.entries});
    }
    case 'SORT_ENTRIES': {
      let entries = [...state.data];
      let sortType = action.sortType;
      if (!action.sortType) {
        if (state.sort.sortField === action.sortField) {
          sortType = state.sort.sortType === 'asc' ? 'desc' : 'asc';
        } else {
          sortType = 'asc';
        }
      }
      let sortCondition = sortType === 'asc' ? [1, 0] : [0, 1];
      entries.sort(function (a, b) {
        return a[action.sortField] > b[action.sortField] ? sortCondition[0] : sortCondition[1];
      });
      return {
        sort: {
          sortField: action.sortField,
          sortType: sortType
        },
        data: entries
      };
    }
    default:
      return state;
  }
}

export { ListingReducer }
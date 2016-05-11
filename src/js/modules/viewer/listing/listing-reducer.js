var reqs = [
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
  }
]

function ListingReducer(state = reqs, action) {
  switch (action.type) {
    case 'SET_REQUEST_ENTRIES': {
      return action.entries;
    }
    case 'SORT_ENTRIES': {
      let entries = [...state];
      entries.sort(function (a, b) {
        return a.status > b.status ? -1 : 1;
      });
      return entries;
    }
    default:
      return state;
  }
}

export { ListingReducer }
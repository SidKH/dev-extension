function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArr(arr) {
  return arr[random(0, arr.length - 1)];
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomSelection(arr) {
  var newArr = [];
  arr.forEach(function (el) {
    if (random(0 , 1) === 1) { newArr.push(el) }
  });
  if (!newArr.length) { newArr.push(arr[0]); }
}

function getId() {
  var id = 0;
  return function () {
    return id++;
  }
}

var entrieId = getId();

var statuses = [200, 304, 500, 502, 503, 510];
var paths = ['twitter.com', 'google.com', 'facebook.com', 'justcoded.com'];
var categories = [
  {title: "Foo", slug: "foo"},
  {title: "Bar", slug: "bar"},
  {title: "Baz", slug: "baz"}
];
var infos = [
  [{
    type: 'keyval',
    title: 'Headers',
    data: [
      {key: 'trololo', val: 'ololo'},
      {key: 'trololo', val: 'ololo'},
      {key: 'trololo', val: 'ololo'},
      {key: 'trololo', val: 'ololo'}
    ]
  },
  {
    type: 'text',
    title: 'Something',
    data: 'for (var i = 0; i < 10; i++) {console.log(123)}'
  }],
  [{
    type: 'keyval',
    title: 'Headers',
    data: [
      {key: 'Something', val: 'another'},
      {key: 'Lorem', val: 'Ipsum'},
      {key: 'trololo', val: 'ololo'},
      {key: 'trololo', val: 'ololo'}
    ]
  },
  {
    type: 'text',
    title: 'Something',
    data: 'for (var i = 0; i < 10; i++) {}'
  },
  {
    type: 'text',
    title: 'Something else',
    data: 'for (var i = 0; i < 10; i++) {console.log(123)}'
  }]
]

module.exports = function () {
  return {
    requests: (function () {
      var requests = [];
      var i = 0;
      for (i = 0; i < 20; i++) {
        requests.push({
          details: "http://localhost:3000/entries/",
          url: 'http://' + randomArr(['microsoft.com', 'facebookc.com', 'google.com', 'justcoded.com']),
          time: randomDate(new Date(2012, 0, 1), new Date()),
          type: randomArr(['PUT', 'POST', 'GET', 'DELETE']),
          id: Math.random().toString(36).substring(7)
        });
      }
      return requests;
    })(),
    entries: (function () {
      var entries = [];
      var i;
      for (i = 0; i < 3; i++) {
        entries.push({
          category: categories[i],
          headers: [
            {title: 'Path', slug: 'path', type: 'info'},
            {title: 'Status', slug: 'status', type: 'status'},
            {title: 'Size', slug: 'size', type: 'size'}
          ],
          data: (function () {
            var data = [];
            for (var i = 0; i < 50; i++) {
              data.push({
                id: Math.random().toString(36).substring(7),
                path: `http://${randomArr(paths)}`,
                status: randomArr(statuses),
                size: random(200, 10000000),
                description: `http://my-api.com/${random(0, 500)}`,
                info: randomArr(infos)
              });
            }
            return data;
          }())
        });
      }
      return entries;
    }())
  }
}
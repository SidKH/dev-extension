function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArr(arr) {
  return arr[random(0, arr.length - 1)];
}

function randomSelection(arr) {
  var newArr = [];
  arr.forEach(function (el) {
    if (random(0 , 1) === 1) { newArr.push(el) }
  });
  if (!newArr.length) { newArr.push(arr[0]); }
}

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
    data: [
      {key: 'trololo', val: 'ololo'}
    ]
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
    data: [
      {key: 'Lorem', val: 'ipsum'}
    ]
  },
  {
    type: 'text',
    title: 'Something',
    data: [
      {key: 'Lorem', val: 'ipsum'}
    ]
  }]
]

module.exports = function () {
  return {
    entries: (function () {
      var entries = [];
      var i;
      for (i = 0; i < 3; i++) {
        entries.push({
          category: categories[i],
          headers: [
            {title: 'Path', slug: 'path', type: 'info'},
            {title: 'Status', slug: 'status', type: 'status'},
            {title: 'Size', slug: 'size', type: 'size'},
            {title: 'Timeline', slug: 'timeline', type: 'timeline'}
          ],
          data: (function () {
            var data = [];
            for (var i = 0; i < 50; i++) {
              data.push({
                path: `http://${randomArr(paths)}`,
                status: randomArr(statuses),
                size: random(200, 10000000),
                timeline: {
                  from: random(200, 5000),
                  to: random(10000, 15000)
                },
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
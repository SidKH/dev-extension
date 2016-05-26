import React from 'react';

let StringCell = ({item}) => {
  return <td>{item}</td>;
}

let LinkCell = ({item}) => {
  return <td><a href={item} target="_blank">{item}</a></td>
}

let StatusCell = ({item}) => {
  var href = `https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#${status}`;
  return <td><a href={href} target="_blank">{item}</a></td>;
}

let TimelineCell = ({item}) => {
  var style = {
    left: ((item.from - item.min) / (item.max - item.min) * 100) + '%',
    right: (100 - (item.to - item.min) / (item.max - item.min) * 100) + '%'
  }
  return <td><div className="timeline-cell"><span className="time" style={style}></span></div></td>
}

let Cells = {
  string: (i, item) => {
    return <StringCell key={i} item={item}></StringCell>;
  },
  link: (i, item) => {
    return <LinkCell key={i} item={item}></LinkCell>;
  },
  status: (i, item) => {
    return <StatusCell key={i} item={item}></StatusCell>;
  },
  timeline: (i, item) => {
    return <TimelineCell key={i} item={item}></TimelineCell>;
  }
}

function getCell(type, i, item) {
  return Cells[type](i, item);
}

export { getCell };
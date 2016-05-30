import React from 'react';
import { connect } from 'react-redux';

let KeyValPart = ({item}) => {
  var rows = [];
  item.forEach(function (el, i) {
    rows.push(<div key={i} className="row"><strong>{el.key}: </strong><span>{el.val}</span></div>);
  });
  return <div className="key-val-content">{rows}</div>;
}

let TextPart = ({item}) => {
  return (<div>I am a text part</div>);
}

let Parts = {
  keyval: (item) => {
    return <KeyValPart item={item}></KeyValPart>;
  },
  text: (item) => {
    return <TextPart item={item}></TextPart>
  }
}

function getPart(type, item) {
  return Parts[type](item);
}

export { getPart };
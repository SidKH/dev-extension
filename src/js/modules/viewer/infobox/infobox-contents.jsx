import React from 'react';
import { connect } from 'react-redux';
import Highlight from 'highlight.js';

/**
 * Key val content part which gets
 *   array of key-val paired objects and reprensent it as a text
 * @param  {Array} options.item - array of key val paired objects
 * @return {Object}             - react element
 */
let KeyValPart = ({item}) => {
  var rows = [];
  item.forEach(function (el, i) {
    rows.push(<div key={i} className="row"><strong>{el.key}: </strong><span>{el.val}</span></div>);
  });
  return <div className="key-val-content">{rows}</div>;
}

/**
 * Text content part which gets plain text
 *   and represent it with auto highlighter
 * @param  {String} options.item - plain text
 * @return {Object}              - react element
 */
let TextPart = ({item}) => {
  return (<div className="pre-text" dangerouslySetInnerHTML={{__html: Highlight.highlightAuto(item).value}}></div>);
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
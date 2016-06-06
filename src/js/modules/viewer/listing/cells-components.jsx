import React from 'react';
import { connect } from 'react-redux';
import * as listingActions from './listing-actions.js';
import * as viewerActions from '../viewer-actions.js';
import HP from '../../../helpers';

/**
 * Size cell represent numer
 *  as a file size (kb, mb, etc...)
 * @param {Number} item - number that will be converted to size format
 * @return {Object}     - React element
 */
let SizeCell = ({item}) => {
  return <td>{HP.formatBytes(item)}</td>
}

/**
 * Simple string cell
 * @param  {String} options.item - string as text for the cell
 * @return {Object}              - React element
 */
let StringCell = ({item}) => {
  return <td>{item}</td>;
}

/**
 * Link cell will wrap string into link that leads on itself
 * @param  {String} options.item  - link
 * @return {Object}               - React element
 */
let LinkCell = ({item}) => {
  return <td><a href={item} target="_blank">{item}</a></td>
}

/**
 * Status cell will wrapw the status number in link
 *   that leads into wikipedia eplanation of the status
 * @param  {String} options.item  - request status
 * @return {Object}               - React element
 */
let StatusCell = ({item}) => {
  var href = `https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#${item}`;
  return <td><a href={href} target="_blank">{item}</a></td>;
}

/**
 * Timeline cell creates visual representation of
 *   time spent on the request
 * @param  {Number} options.item.min  - Min timestamp of all requests 
 * @param  {Number} options.item.max  - Max timestamp of all requests
 * @param  {Number} options.item.from - Timestamp, when request is sent
 * @param  {Number} options.item.to   - Timestamp, when request get a response
 * @return {Object}                   - React element
 */
let TimelineCell = ({item}) => {
  var style = {
    left: ((item.from - item.min) / (item.max - item.min) * 100) + '%',
    right: (100 - (item.to - item.min) / (item.max - item.min) * 100) + '%'
  }
  return <td><div className="timeline-cell"><span className="time" style={style}></span></div></td>
}

/**
 * Info cell creates cell which will set infobox window
 *  when we click on it
 * @param {String} options.item       - String which will be setted into the cell
 * @param {Number} options.index      - Index of the viewwable data component
 * @param {Function} options.getInfo  - Function which dispatches setInfobox
 */
let InfoCell = ({item, index, getInfo}) => {
  return <td className="info-cell"><span onClick={() => getInfo(index)}>{item}</span></td>
}

InfoCell = connect(
  null,
  (dispatch) => {
    return {
      getInfo: function (index) {
        dispatch(viewerActions.setInfoBox(index));
      }
    }
  }
)(InfoCell);

/**
 * Cells object.
 *  Any cell correspond to the specific key
 *  which will be the type of the cell
 */
let Cells = {
  string: (i, item, index) => {
    return <StringCell key={i} item={item}></StringCell>;
  },
  link: (i, item, index) => {
    return <LinkCell key={i} item={item}></LinkCell>;
  },
  status: (i, item, index) => {
    return <StatusCell key={i} item={item}></StatusCell>;
  },
  size: (i, item, index) => {
    return <SizeCell key={i} item={item}></SizeCell>;
  },
  timeline: (i, item, index) => {
    return <TimelineCell key={i} item={item}></TimelineCell>;
  },
  info: (i, item, index) => {
    return <InfoCell key={i} index={index} item={item}></InfoCell>;
  }
}

/**
 * Function for getting the cell based on its type
 * @param {String} options.type     - type of the cell (you can see all types as keys in @Cells object)
 * @param {Number} options.i        - index of the cell in the row (just for key property)
 * @param {Object} options.item     - json object which will be representing as some data inside the cell
 * @index {Number} options.index    - current index of the viewable data (serves to get the object from the data array)
 */
function getCell(type, i, item, index) {
  return Cells[type](i, item, index);
}

export { getCell };
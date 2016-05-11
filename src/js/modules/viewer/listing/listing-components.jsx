import React from 'react';
import { connect } from 'react-redux';
import * as listingActions from './listing-actions.js';
import classNames from 'classnames/bind';

let ListItem = ({item, n}) => {
  let evently = n % 2;
  let className = classNames({
    'viwer-list-item': true,
    'even': evently,
    'odd': !evently
  });
  var nClass = item.n % 2 ? 'even': 'odd';
  return (
    <tr className={className}>
      <td><a href={item.path} target="_blank">{item.path}</a></td>
      <td><a href={`https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#${item.status}`} target="_blank">{item.status}</a></td>
      <td>{item.type}</td>
      <td>{item.size}</td>
    </tr>
  );
}

let Listing = ({entries, dispatch}) => {
  var listItems = entries.map(function (el, i) {
    return <ListItem item={el} key={i} n={i} />
  });
  return (
    <table className="viwer-list">
      <thead>
        <tr>
          <th onClick={() => dispatch(listingActions.sortEntries('path'))} className="path">Path</th>
          <th className="status">Status</th>
          <th className="type">Type</th>
          <th className="syze">Size</th>
        </tr>
      </thead>
      <tbody>
        {listItems}
      </tbody>
    </table>
  );
}

Listing = connect(
  (store) => {
    return {
      entries: store.listing
    };
  }
)(Listing)

export { Listing }
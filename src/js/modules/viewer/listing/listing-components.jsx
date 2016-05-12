import React from 'react';
import { connect } from 'react-redux';
import * as listingActions from './listing-actions.js';
import classNames from 'classnames/bind';
import { Filters } from './filters-components.jsx';
import HP from '../../../helpers';

/**
 * List item of the table (table row)
 * @param  {Object} options.item - item state object
 * @param  {Index} options.n    - item index in items array
 */
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
      <td>{item.category.title}</td>
      <td>{HP.formatBytes(item.size)}</td>
    </tr>
  );
}

let HeadCell = ({slug, text, sortState, sort}) => {
  let className = classNames({
    [slug]: true,
    'sort-asc': sortState.sortField === slug && sortState.sortType === 'asc',
    'sort-desc': sortState.sortField === slug && sortState.sortType === 'desc'
  });
  return <th className={className} onClick={() => sort(slug)}>{text}</th>
}

HeadCell = connect(
  (store) => {
    return {
      sortState: store.listing.sort
    }
  },
  (dispatch) => {
    return {
      sort: function (field, type) {
        dispatch(listingActions.sortEntries(field, type));
      }
    }
  }
)(HeadCell);

let Table = ({entries, sortState, dispatch}) => {
  var listItems = entries.map(function (el, i) {
    return <ListItem item={el} key={i} n={i} />
  });
  return (
    <table className="viwer-list">
      <thead>
        <tr>
          <HeadCell text="Path" slug="path" />
          <HeadCell text="Status" slug="status" />
          <HeadCell text="Type" slug="type" />
          <HeadCell text="Size" slug="size" />
        </tr>
      </thead>
      <tbody>
        {listItems}
      </tbody>
    </table>
  );
}

Table = connect(
  (store) => {
    return {
      entries: store.listing.viewData
    };
  },
  (dispatch) => {
    return {
      dispatch: dispatch,
      getData: dispatch(listingActions.setEntries())
    }
  }
)(Table)

const Listing = () => {
  return (
    <div id="listing">
      <Filters />
      <Table />
    </div>
  );
}

export { Listing }
import React from 'react';
import { connect } from 'react-redux';
import * as listingActions from './listing-actions.js';
import classNames from 'classnames/bind';
import { Filters } from './filters-components.jsx';
import HP from '../../../helpers';
import moment from 'moment';
import 'moment-duration-format';

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
      <td>{moment.duration(item.time).format('h[h] mm[m] ss[s]')}</td>
    </tr>
  );
}

/**
 * TH cell of the table component
 * @param  {String} options.slug      slug of the column
 * @param  {String} options.text      title of the cell
 * @param  {Object} options.sortState current sorting state
 * @param  {Function} options.sort    sort option from reducer
 */
let HeadCell = ({slug, text, sortState, sort}) => {
  let className = classNames({
    [slug]: true,
    'sort-asc': sortState.sortField === slug && sortState.sortType === 'asc',
    'sort-desc': sortState.sortField === slug && sortState.sortType === 'desc'
  });
  return <th className={className} onClick={() => sort(slug)}>{text}<span>{text}</span></th>
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

/**
 * Listing table component
 * @param  {Array} options.entries   request entries from the store
 * @param  {Object} options.sortState current sorting state
 */
let Table = ({entries, sortState}) => {
  var listItems = entries.map(function (el, i) {
    return <ListItem item={el} key={i} n={i} />
  });
  return (
    <table className="viwer-list">
      <thead>
        <tr>
          <HeadCell text="Path" slug="path" />
          <HeadCell text="Status" slug="status" />
          <HeadCell text="Type" slug="category" />
          <HeadCell text="Size" slug="size" />
          <HeadCell text="Time" slug="time" />
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

/**
 * Listing container component
 */
const Listing = () => {
  return (
    <div id="listing">
      <Filters />
      <div className="listing-table">
        <div className="scroll-holder">
          <Table />
        </div>
      </div>
    </div>
  );
}

export { Listing }
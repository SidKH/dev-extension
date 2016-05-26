import React from 'react';
import { connect } from 'react-redux';
import * as listingActions from './listing-actions.js';
import classNames from 'classnames/bind';
import { Filters } from './filters-components.jsx';
import HP from '../../../helpers';
import moment from 'moment';
import 'moment-duration-format';

let StringCell = ({str}) => {
  return <td>{str}</td>;
}

let LinkCell = ({link}) => {
  return <td><a href={link} target="_blank">{link}</a></td>
}

let StatusCell = ({status}) => {
  var href = `https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#${status}`;
  return <td><a href={href}>{status}</a></td>;
}

/**
 * List item of the table (table row)
 * @param  {Object} options.item - item state object
 * @param  {Index} options.n    - item index in items array
 */
let ListItem = ({item, headers, n}) => {
  let evently = n % 2;
  let className = classNames({
    'viwer-list-item': true,
    'even': evently,
    'odd': !evently
  });
  var nClass = item.n % 2 ? 'even': 'odd';
  var tds = headers.map(function (el, i) {
    let cell;
    switch (el.type) {
      case 'link': {
        cell = <LinkCell key={i} link={item[el.slug]}></LinkCell>
        break;
      }
      case 'status': {
        cell = <StatusCell key={i} status={item[el.slug]}></StatusCell>
        break;
      }
      default: {
        cell = <StringCell key={i} str={item[el.slug]}></StringCell>
      }
    }
    return cell;
  });
  return (
    <tr className={className}>
      {tds}
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
let HeadCell = ({slug, text, sortState, headers, sort}) => {
  let className = classNames({
    [slug]: true,
    'sort-asc': sortState.sortField === slug && sortState.sortType === 'asc',
    'sort-desc': sortState.sortField === slug && sortState.sortType === 'desc'
  });
  let styles = {
    width: 100 / headers.length + '%'
  }
  return <th style={styles} className={className} onClick={() => sort(slug)}>{text}<span style={styles}>{text}</span></th>
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
let Table = ({entries}) => {
  var headers = entries.headers.map(function (el, i) {
    return <HeadCell key={i} headers={entries.headers} text={el.title} slug={el.slug} />
  });
  var listItems = entries.list.map(function (el, i) {
    return <ListItem item={el} headers={entries.headers} key={i} n={i} />
  });
  return (
    <table className="viwer-list">
      <thead>
        <tr>
          {headers}
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
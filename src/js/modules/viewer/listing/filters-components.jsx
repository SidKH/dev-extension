import React from 'react';
import { connect } from 'react-redux';
import * as listingActions from './listing-actions.js';
import classNames from 'classnames/bind';
import moment from 'moment';

let RequestSelect = ({reqList, currentReq, setRequest}) => {
  let options = reqList.map(function (el, i) {
    return <option key={i} value={el.id}>{el.type} | {el.url} | {moment(new Date(el.time)).calendar()}</option>
  });
  if (!currentReq) { setRequest(reqList[0].id) };
  return (
    <select className="requests-select" value={currentReq} onChange={(e) => setRequest(e.currentTarget.value)}>
      {options}
    </select>
  );
}

RequestSelect = connect(
  (store) => {
    return {
      reqList: store.listing.reqList,
      currentReq: store.listing.currentReq
    }
  },
  (dispatch) => {
    return {
      setRequest: (id) => dispatch(listingActions.setNewRequest(id))
    }
  }
)(RequestSelect);

/**
 * Text input for text filtering
 * @param  {String} options.filterText filter text from the store
 * @param  {Function} options.setFilter  setter for the text filter to the stoer
 */
let FiltersInput = ({filterText, setFilter}) => {
  return <input type="text" className="text-filter" placeholder="Search" value={filterText} onChange={(e) => setFilter(e.target.value)}/>
}

FiltersInput = connect(
  (store) => {
    return {
      filterText: store.listing.filterText
    }
  },
  (dispatch) => {
    return {
      setFilter: (str) => dispatch(listingActions.filterText(str))
    }
  }
)(FiltersInput);

/**
 * Single category filter item
 * @param  {Object} options.item      Item object from the store
 * @param  {String} options.filter    Current filter in the app
 * @param  {Function} options.setFilter Setter for the filter
 */
let FilterItem = ({item, filter, setFilter}) => {
  let className = classNames({
    'filter': true,
    'active': item.slug === filter
  });
  return <span className={className} onClick={() => setFilter(item.slug)}>{item.title}</span>;
}

FilterItem = connect(
  (store) => {
    return {
      filter: store.listing.filter
    }
  },
  (dispatch) => {
    return {
      setFilter: (filter) => dispatch(listingActions.filterEntries(filter, true))
    }
  }
)(FilterItem);

/**
 * Filters component
 * @param  {Array} options.categories - array of the categories
 * @param  {Function} options.setFilter  - dispatch set filter event
 */
let FiltersList = ({categories}) => {
  let catComponents = categories.map(function (el, i) {
    return (
      <FilterItem key={i} item={el} />
    );
  });
  return (
    <div className="filters-list">
      <span className="title">Filters:</span>
      {catComponents}
    </div>
  );
}

FiltersList = connect(
  (store) => {
    return {
      categories: store.listing.categories
    }
  }
)(FiltersList);

/**
 * Filters Container
 */
let Filters = () => {
  return (
    <div className="filters">
      <FiltersInput />
      <FiltersList />
      <RequestSelect />
    </div>
  );
}



export { Filters };
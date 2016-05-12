import React from 'react';
import { connect } from 'react-redux';
import * as listingActions from './listing-actions.js';
import classNames from 'classnames/bind';

let FiltersInput = ({filterText, setFilter}) => {
  return <input type="text" value={filterText} onChange={(e) => setFilter(e.target.value)}/>
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
      setFilter: (filter) => dispatch(listingActions.filterEntries(filter))
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
  let allFilter = {slug: 'all', title: 'All'};
  return (
    <div className="filters-list">
      <span className="title">Filters:</span>
      <FilterItem key={-1} item={allFilter} />
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

let Filters = () => {
  return (
    <div className="filters">
      <FiltersInput />
      <FiltersList />
    </div>
  );
}



export { Filters };
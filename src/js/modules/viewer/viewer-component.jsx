import React from 'react';
import { connect } from 'react-redux';
import { Listing } from './listing/listing-components.jsx';
import { InfoBox } from './infobox/infobox-components.jsx';
import classNames from 'classnames/bind';

let Loader = () => (
  <div className="sk-folding-cube selected loader">
    <div className="sk-cube1 sk-cube"></div>
    <div className="sk-cube2 sk-cube"></div>
    <div className="sk-cube4 sk-cube"></div>
    <div className="sk-cube3 sk-cube"></div>
  </div>
);

let Viewer = ({hp}) => {
  let clss = classNames({
    'loading': hp.loading
  });
  return (
    <div className={clss}>
      <Listing/>
      <InfoBox/>
      <Loader/>
    </div>
  )
};

Viewer = connect(
  (state) => {
    return {
      hp: state.hp
    }
  }
)(Viewer);

export { Viewer }
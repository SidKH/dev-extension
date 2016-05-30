import React from 'react';
import { connect } from 'react-redux';
import { getPart } from './infobox-contents.jsx';
import classNames from 'classnames/bind';
import * as infoboxActions from './infobox-actions';

let InfoBoxTabs = ({infoBox, setTab}) => {
  let links = [];
  infoBox.content.forEach(function (el, i) {
    let cls = infoBox.activeTab === i ? 'active' : '';
    links.push(<li key={i} className={cls} onClick={() => setTab(i)}>{el.title}</li>);
  });
  let currentTab = infoBox.content[infoBox.activeTab];
  return (
    <div>
      <ul className="tabs-nav">{links}</ul>
      <div className="tab">{getPart(currentTab.type, currentTab.data)}</div>
    </div>
  );
}

InfoBoxTabs = connect(
  null,
  (dispatch) => {
    return {
      setTab: function (index) {
        dispatch(infoboxActions.setTab(index));
      }
    }
  }
)(InfoBoxTabs);

let InfoBox = ({infoBox}) => {
  if (!infoBox.content) {return false}
  return (
    <div className="info-box">
      <InfoBoxTabs infoBox={infoBox} />
    </div>
  );
};

InfoBox = connect(
  (store) => {
    return {
      infoBox: store.infoBox
    }
  },
  (dispatch) => {
    return {}
  }
)(InfoBox);

export { InfoBox };
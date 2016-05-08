import React from 'react';
import { connect } from 'react-redux';
import * as actions from './test-actions';

let SelectComponent = ({opts, onSelect}) => {
  let optsComponents = opts.map(function (el, i) {
    return (
      <option value={el.url} key={i}>{el.title}</option>
    )
  });
  onSelect(opts[0].url);
  return (
    <select id="select" onChange={(e) => onSelect(e.target.value)}>{optsComponents}</select>
  );
}
SelectComponent = connect(
  (store) => {
    return {
      opts: store.opts
    }
  },
  (dispatch) => {
    return {
      onSelect: (value) => {
        dispatch(actions.getData(value));
      }
    }
  }
)(SelectComponent);

let ContentComponent = ({data}) => {
  var lis = !data ? [] : data.map(function (el, i) {
    return <li className="list-group-item" key={i}>{JSON.stringify(el)}</li>
  });
  return (
    <ul className="list-group jpl-content">
      {lis}
    </ul>
  )
}
ContentComponent = connect(
  (store) => {
    return {
      data: store.data
    }
  }
)(ContentComponent);

let App = ({loader}) => {
  var cls = loader.isLoading ? 'loading' : '';
  return (
    <div id="wrapper" className="container">
      <h3 className={cls}>I am a React App and I <span className="fetch">fetch</span> data from JSONplaceholder</h3>
      <div className="row">
        <div className="col-xs-3">
          <SelectComponent />
        </div>
        <div className="col-xs-9">
          <ContentComponent />
        </div>
      </div>
    </div>
  )
}

App = connect(
  (store) => {
    return {
      loader: store.loader
    }
  }
)(App);

export { App }
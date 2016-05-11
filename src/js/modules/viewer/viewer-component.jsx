import React from 'react';
import { connect } from 'react-redux';
import { Listing } from './listing/listing-components.jsx';

const Viewer = () => (
  <div>
    <Listing/>
  </div>
);

export { Viewer }
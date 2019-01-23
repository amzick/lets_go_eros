import React from 'react';
import { logout } from '../../util/session_api_util';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Logout extends React.Component {
  render() {
    return (
      <h1>Please fucking work</h1>
    )

  }
}

const msp = state => {
  return {

  };
};


export default withRouter(connect(msp, null)(Logout));
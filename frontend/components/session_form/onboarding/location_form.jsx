import React from 'react';
import { connect } from 'react-redux';

const msp = state => {
  return ({
    errors: state.errors.ui,
  });
};

const mdp = dispatch => {
  return ({

  });
};

class LocationForm extends React.Component {

  render() {

    return (
      <div>Location Form</div>
    )
  }
}

export default connect(msp, mdp)(LocationForm);
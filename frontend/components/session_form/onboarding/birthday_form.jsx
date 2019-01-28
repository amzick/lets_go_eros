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

class BirthdayForm extends React.Component {

  render() {

    return (
      <div>BirthdayForm</div>
    )
  }
}

export default connect(msp, mdp)(BirthdayForm);
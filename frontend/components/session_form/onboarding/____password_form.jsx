import React from 'react';
import { connect } from 'react-redux';
import DynamicInput from '../dynamic_input';

const msp = state => {
  return {

  };
};

const mdp = dispatch => {
  return {

  };
};

class PasswordForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form>{this.props.formType}
        <DynamicInput />

      </form>
    )
  }
}

export default connect(msp, mdp)(PasswordForm);
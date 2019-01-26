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

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form>
        <DynamicInput />
      </form>
    )
  }
}

export default connect(msp, mdp)(EmailForm);
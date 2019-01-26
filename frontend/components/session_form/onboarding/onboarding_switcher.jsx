import React from 'react';
import { connect } from 'react-redux';


const msp = state => {
  return {

  };
};

const mdp = dispatch => {
  return {

  };
};

const OnboardingSwitcher = (props) => {
  
  return (
    <div>{props.formType}</div>
  )
};

export default connect(msp, mdp)(OnboardingSwitcher);

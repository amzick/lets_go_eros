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

const RenderErrors = props => {
  return (
    <ul className="error-messages">
      {props.errors.map((error, index) => {
        return <li key={`error-${index}`}>
          {error}
        </li>
      })}
    </ul>
  )
}

export default connect(msp, mdp)(RenderErrors);
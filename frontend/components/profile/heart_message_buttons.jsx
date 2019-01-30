import React from 'react';
import { connect } from 'react-redux';

const msp = state => {
  return ({

  });
};

const mdp = dispatch => {
  return ({

  });
};

class HeartMessageButtons extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='heart-message-buttons'>
        <button>Heart</button>
        <button>Message</button>
      </div>
    )
  }
}

export default connect(msp, mdp)(HeartMessageButtons);
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

class YouAndThem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='you-and-them-div'>
        you and them
      </div>
    )
  }
}

export default connect(msp, mdp)(YouAndThem);
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

class QuestionView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>"Question View"</div>
    )
  }
}

export default connect(msp, mdp)(QuestionView);
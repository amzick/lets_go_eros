import React from 'react';
import { connect } from 'react-redux';

const msp = state => {
  return({

  });
};

const mdp = dispatch => {
  return({

  });
};

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    return(
      <div>"Question Form"</div>
    )
  }
}

export default connect(msp,mdp)(QuestionForm);
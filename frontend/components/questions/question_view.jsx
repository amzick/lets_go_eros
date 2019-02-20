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
    const { question, response, pageUser } = this.props;
    const responses = [
      "strongly disagrees",
      "disagrees",
      "is neutral",
      "agrees",
      "strongly agrees"
    ];
    if (question.inversion) responses.reverse();

    return (
      <div>
        <h3>"I {`${question.question}`}"</h3>
        <p>{pageUser.fname} {responses[response]}!</p>
      </div>
    )
  }
}

export default connect(msp, mdp)(QuestionView);
import React from 'react';
import { connect } from 'react-redux';

const msp = (state, ownProps) => {
  return ({
    // questions: state.entities.questions,
    question: state.entities.questions[ownProps.questionID],
    responses: ownProps.pageUser.responses,
    currentUser: ownProps.currentUser,
    pageUser: ownProps.pageUser,
  });
};

const mdp = dispatch => {
  return ({
    fetchQuestion: (questionID) => dispatch(fetchQuestion(questionID)),
  });
};

class QuestionContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // always fetch the questions before passing them into here
  }

  render() {

    const { question, responses, currentUser, pageUser } = this.props;
    let renderComponent;
    if (currentUser === pageUser) {
      renderComponent = <QuestionForm />
    } else {
      renderComponent = <QuestionView question={question} response={responses[question.id]} />
    }
    return (
      <div>Question form for {`${question.id}`}</div>
    )
  }
}

export default connect(msp,mdp)(QuestionContainer);
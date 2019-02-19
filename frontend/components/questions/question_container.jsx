import React from 'react';
import { connect } from 'react-redux';

import { fetchRandomUnansweredQuestion } from '../../util/question_api_util';
import { fetchQuestion } from '../../actions/question_actions';


const msp = (state, ownProps) => {
  return ({
    questions: state.entities.questions,
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
    this.state = {
      questionLoaded: false,
      randomUnansweredQuestion: null,
    };
  }

  componentDidMount() {
    // debugger
    const { pageUser } = this.props;
    fetchRandomUnansweredQuestion(pageUser.id).then(resp => {
      if (resp) {
        this.props.fetchQuestion(resp.id).then(() => {
          this.setState({ randomUnansweredQuestion: resp.id, questionLoaded: true });
        });
      } else {
        this.setState({questionLoaded: true });        
      }
  });
}

render() {
  const { questions } = this.props;

  let renderComponent = <div>"Loading..."</div>;
  if (this.state.questionLoaded) {
    if (this.state.randomUnansweredQuestion) {
      // debugger
      renderComponent = <div>{`This will be a question form for ${questions[this.state.randomUnansweredQuestion].id}`}</div>
      // renderComponent = <div>"Something loaded"</div>;
    } else {
      renderComponent = <div>"You've answered all the questions"</div>;
    }
  }

  return (
    renderComponent
  )
}
}

export default connect(msp, mdp)(QuestionContainer);
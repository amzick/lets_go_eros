import React from 'react';
import { connect } from 'react-redux';

import QuestionContainer from './question_container';

import { fetchRandomUnansweredQuestion, fetchRandomAnsweredQuestion } from '../../util/question_api_util';
import { fetchQuestion } from '../../actions/question_actions';


const msp = (state, ownProps) => {
  return ({
    questions: state.entities.questions,
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

class RandomQuestionContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questionLoaded: false,
      questionID: null,
    };
  }

  componentDidMount() {
    // debugger
    const { currentUser, pageUser } = this.props;
    if (currentUser === pageUser) {
      fetchRandomUnansweredQuestion(pageUser.id).then(resp => {
        if (resp) {
          this.props.fetchQuestion(resp).then(() => {
            this.setState({ questionID: resp, questionLoaded: true });
          });
        } else {
          this.setState({ questionLoaded: true });
        }
      });
    } else {
      fetchRandomAnsweredQuestion(pageUser.id).then(resp => {
        if (resp) {
          this.props.fetchQuestion(resp).then(() => {
            this.setState({ questionID: resp, questionLoaded: true });
          });
        } else {
          this.setState({ questionLoaded: true });
        }
      });
    }
  }

  componentDidUpdate(prevProps) {

    if (!this.state.questionLoaded) {
      const { currentUser, pageUser } = this.props;
      if (currentUser === pageUser) {
        fetchRandomUnansweredQuestion(pageUser.id).then(resp => {
          if (resp) {
            this.props.fetchQuestion(resp).then(() => {
              this.setState({ questionID: resp, questionLoaded: true });
            });
          } else {
            this.setState({ questionLoaded: true });
          }
        });
      } else {
        fetchRandomAnsweredQuestion(pageUser.id).then(resp => {
          if (resp) {
            this.props.fetchQuestion(resp).then(() => {
              this.setState({ questionID: resp, questionLoaded: true });
            });
          } else {
            this.setState({ questionLoaded: true });
          }
        });
      }
    }

    if (prevProps.responses !== this.props.responses) {
      console.log("new response detected");
    }


  }

  render() {
    const { currentUser, pageUser } = this.props;


    let renderComponent = <div>"Loading..."</div>;
    if (this.state.questionLoaded) {
      if (this.state.questionID) {
        // debugger
        // renderComponent = <div>{`This will be a question form for ${questions[this.state.questionID].id}`}</div>
        renderComponent = <QuestionContainer currentUser={this.props.currentUser} pageUser={this.props.pageUser} questionID={this.state.questionID} />
        // renderComponent = <div>"Something loaded"</div>;
      } else {

        renderComponent = <div>
          {currentUser === pageUser ? "You've answered all the questions!" :  ` ${pageUser.fname} hasn't answered any questions!`}
        </div>;
      }
    }

    return (
      renderComponent
    )
  }
}

export default connect(msp, mdp)(RandomQuestionContainer);
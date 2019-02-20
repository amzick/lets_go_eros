import React from 'react';
import { connect } from 'react-redux';

import { createResponse, updateResponse } from '../../util/question_api_util';
import { fetchUser } from '../../actions/user_actions';

const msp = state => {
  return ({

  });
};

const mdp = dispatch => {
  return ({
    fetchUser: (userID) => dispatch(fetchUser(userID))
  });
};

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selections: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
      },
      response: props.response,
    };

    if (props.response) this.state.selections[props.response] = true;
    this.updating = props.response ? true : false;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    let newSelections = {};
    for (let i = 0; i < 5; i++) {
      if (i === parseInt(event.target.value)) {
        this.state.selections[i] ? newSelections[i] = false : newSelections[i] = true;
      } else {
        newSelections[i] = false;
      }
    }

    if (this.state.selections[event.target.value]) {
      this.setState({ selections: newSelections, response: null }, () => {
        console.log(this.state.response);
      });
    } else {
      this.setState({ selections: newSelections, response: event.target.value }, () => {
        console.log(this.state.response);
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { currentUser, question, fetchUser } = this.props;
    const newResponse = {
      user_id: currentUser.id,
      question_id: question.id,
      response: this.state.response
    };

    if (this.updating) {
      // call props.updateResponse
      updateResponse(newResponse).then(() => fetchUser(currentUser.id));
    } else {
      // call create response, then fetchUser... he'll have new responses.. hopefully things rerender..
      createResponse(newResponse).then(() => fetchUser(currentUser.id));
    }
  }

  render() {
    const { question, response, currentUser } = this.props;
    const options = [
      "I strongly disagree",
      "I disagree",
      "I'm neutral",
      "I agree",
      "I strongly agree"
    ];

    let optionsArray = new Array();

    options.forEach((el, idx) => {
      const value = question.inversion ? 4 - idx : idx;
      // const checked = (this.state.selections[idx]);
      const labelClass = (this.state.selections[value] ? "checked-response" : "unchecked-response");
      optionsArray.push(
        <label key={`${question.id}-${value}`} className={labelClass}>{el}
          <input className="response-radio-input" type="radio" checked={this.state.selections[value] ? "checked" : ""} name="response" value={value} onChange={this.handleChange} />
        </label>
      )
    })



    return (
      <div className="question-div">
        <h3>"I {`${question.question}`}"</h3>
        <div className="response-options-div">
          {optionsArray}
          <input type="submit" className={this.state.response ? "mini-valid-submit" : "mini-invalid-submit"} onClick={this.handleSubmit} disabled={this.state.response ? "" : "disabled"} value="Answer!" />
        </div>
      </div>
    )
  }
}

export default connect(msp, mdp)(QuestionForm);
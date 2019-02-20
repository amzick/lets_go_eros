import React from 'react';
import { connect } from 'react-redux';
import { merge } from 'lodash';

const msp = state => {
  return ({

  });
};

const mdp = dispatch => {
  return ({

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

    if (props.response) this.state.selections[response] = true;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    // debugger
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
    console.log("submitting");
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
      <div>
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
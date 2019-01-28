import React from 'react';
import { connect } from 'react-redux';
import { merge } from 'lodash';

import { validateField } from "../../../util/ui_util";
import { updateField, updateNewUser } from '../../../actions/ui_actions';
import { clearErrors } from '../../../actions/session_actions';
import RenderDynamicErrors from '../../errors/render_dynamic_errors';


const msp = state => {
  const possibleYears = [];
  const mostRecentValidYear = new Date().getFullYear() - 18;
  for (let i = mostRecentValidYear; i >= 1900; i--) {
    possibleYears.push(i);
  }
  const yearsArray = possibleYears.map((year) => {
    return <option value={year.toString()} key={year}>{year}</option>;
  });

  return ({
    errors: state.errors.ui,
    newUser: state.ui.newUser,
    yearsArray
  });
};

const mdp = dispatch => {
  return ({
    updateField: (field) => dispatch(updateField(field)),
    updateNewUser: (datum) => dispatch(updateNewUser(datum)),
    clearErrors: () => dispatch(clearErrors()),
  });
};

class BirthdayForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.newUser = props.newUser;
    this.state.errors = props.errors;
    this.state.year = "";
    this.state.month = "";
    this.state.day = "";
    // fix
    this.state.submitClass = "invalid-submit";
    this.state.disabled = "disabled";
    //
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBirthday(field) {
    return (event) => {
      this.setState({
        [field]: event.target.value
      }, () => {
        if (this.state.year !== "" && this.state.month !== "" && this.state.day !== "") {
          const date = (`${this.state.year}-${this.state.month}-${this.state.day}`);

          validateField("birthday", date)
            .then((resp) => {
              this.setState({ errors: [], disabled: "", submitClass: "valid-submit" },
                () => {

                  this.props.updateNewUser({ field: resp.field, value: (new Date(resp.value)) })
                });
            },
              (bad) => {

                this.setState({ errors: bad.responseJSON, disabled: "disabled", submitClass: "invalid-submit" });
              })
        }
      });
    };
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.handler("location");
    this.props.updateField("location");
    this.props.updateNewUser({ field: "birthday", value: this.state.newUser.birthday })
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  render() {

    

    const { yearsArray } = this.props;
    let daysInMonth = 0;

    switch (this.state.month) {
      case "2":
        daysInMonth = 28;
        if (this.state.year && (
          (parseInt(this.state.year) % 4 === 0)) &&
          !(parseInt(this.state.year) % 100 === 0) ||
          (parseInt(this.state.year) % 400 === 0)
        ) {
          daysInMonth++;
        }
        break;
      case "1":
      case "3":
      case "5":
      case "7":
      case "8":
      case "10":
      case "12":
        daysInMonth = 31;
        break;
      case "4":
      case "6":
      case "9":
      case "11":
        daysInMonth = 30;
        break;
      default:
        daysInMonth = 0;
        break;
    }

    const daysArray = [];
    if (daysInMonth !== 0) {
      for (let i = 1; i <= daysInMonth; i++) {
        daysArray[i - 1] = <option key={i} value={i.toString()}>{i}</option>;
      }
    }


    return (
      <div>
        BirthdayForm
        <form onSubmit={this.handleSubmit}>
          <label>Birthday:
            <select onChange={this.handleBirthday("year")} value={this.state.year}>Year
              <option value="" disabled>Year</option>
              {yearsArray}
            </select>

            <select onChange={this.handleBirthday("month")} value={this.state.month}>Month
              <option value="" disabled>Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>

            <select onChange={this.handleBirthday("day")} value={this.state.day}>Day
              <option value="" disabled>Day</option>
              {daysArray}
            </select>

          </label>
          <RenderDynamicErrors errors={this.state.errors} />
          <button className={this.state.submitClass} disabled={this.state.disabled}>next</button>

        </form>
      </div>
    )
  }
}

export default connect(msp, mdp)(BirthdayForm);
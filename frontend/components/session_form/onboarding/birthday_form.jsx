import React from 'react';
import { connect } from 'react-redux';
import { merge } from 'lodash';

import { validateField } from "../../../util/ui_util";
import { updateField, updateNewUser } from '../../../actions/ui_actions';
import { clearErrors } from '../../../actions/session_actions';
import RenderDynamicErrors from '../../errors/render_dynamic_errors';
import RenderDynamicMessages from '../../errors/render_dynamic_messages';


const msp = state => {
  return ({
    errors: state.errors.ui,
    newUser: state.ui.newUser,
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

    this.state.year = (props.newUser.birthday.toDateString() === new Date().toDateString() ? "" : props.newUser.birthday.getFullYear());
    this.state.month = (props.newUser.birthday.toDateString() === new Date().toDateString() ? "" : props.newUser.birthday.getMonth() + 1);
    this.state.day = (props.newUser.birthday.toDateString() === new Date().toDateString() ? "" : props.newUser.birthday.getDate());


    let initialDaysArray = [];
    let daysInMonth = 0;


    switch (this.state.month) {
      case 2:
        daysInMonth = 28;
        if (this.state.year && (
          (parseInt(this.state.year) % 4 === 0)) &&
          !(parseInt(this.state.year) % 100 === 0) ||
          (parseInt(this.state.year) % 400 === 0)
        ) {
          daysInMonth++;
        }
        break;
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        daysInMonth = 31;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        daysInMonth = 30;
        break;
      default:
        daysInMonth = 0;
        break;
    }

    if (daysInMonth !== 0) {
      for (let i = 1; i <= daysInMonth; i++) {
        initialDaysArray[i - 1] = <option key={i} value={i.toString()}  >{i}</option>;
      }
    }

    this.state.daysArray = initialDaysArray;

    console.log("daysArray:", this.state.daysArray);

    this.state.messages = [];

    this.state.submitClass = (props.newUser.birthday.toDateString() === new Date().toDateString() ? "invalid-submit" : "valid-submit");
    this.state.disabled = (props.newUser.birthday.toDateString() === new Date().toDateString() ? "disabled" : "");

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleBirthday = this.handleBirthday.bind(this);
    this.updateDaysArray = this.updateDaysArray.bind(this);
  }

  handleBirthday(field) {
    const that = this;

    return (event) => {
      console.log(event.target.value);
      this.setState({
        [field]: event.target.value
      }, () => {

        this.updateDaysArray();
        if (this.state.year !== "" && this.state.month !== "" && this.state.day !== "") {

          const newDate = (`${this.state.month}-${this.state.day}-${this.state.year}`);

          validateField("birthday", newDate)
            .then((resp) => {
              console.log("validateField resp:", resp);
              this.setState({ errors: [], disabled: "", submitClass: "valid-submit", messages: [`Oooh, a ${resp.sign}!`] },
                () => {
                  console.log(resp);
                  let setUser = merge({}, this.state.newUser);
                  // why...
                  // 
                  setUser.birthday = new Date(newDate);
                  this.setState({ newUser: setUser }, () => {
                    this.props.updateNewUser({ field: resp.field, value: (new Date(newDate)) });
                  });
                });
            },
              (bad) => {

                this.setState({ errors: bad.responseJSON, disabled: "disabled", submitClass: "invalid-submit", messages: [] });
              });
        }
      });
    };
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.handler("location");
    this.props.updateField("location");

    this.props.updateNewUser({ field: "birthday", value: this.state.newUser.birthday });
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  updateDaysArray() {
    let daysInMonth = 0;


    // this.state.month is a string at this point, handled differently in constructor. code could be dryer; will refactor later, will just be happy when this works
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

    const newDaysArray = [];
    if (daysInMonth !== 0) {
      for (let i = 1; i <= daysInMonth; i++) {
        newDaysArray[i - 1] = <option key={i} value={i.toString()}  >{i}</option>;
      }
    }


    this.setState({ daysArray: newDaysArray });
  }

  render() {

    const possibleYears = [];
    const mostRecentValidYear = new Date().getFullYear() - 18;
    for (let i = mostRecentValidYear; i >= 1900; i--) {
      possibleYears.push(i);
    }
    const yearsArray = possibleYears.map((year) => {
      return <option value={year.toString()} key={year} >{year}</option>;
    });



    return (
      <div className="dynamic-input-div">
        <h1 className="dynamic-input-message">When were you born?</h1>
        <form className="birthday-form" onSubmit={this.handleSubmit}>
          <div className="birthday-form-div">
            <select className="birthday-select" onChange={this.handleBirthday("year")} value={this.state.year === "" ? "" : this.state.year}>Year
              <option value="" disabled>Year</option>
              {yearsArray}
            </select>

            <div className="birthday-MD-div">
              <div className="MD">
                <select className="birthday-select" onChange={this.handleBirthday("month")} value={this.state.month.toString()}>Month
                  <option value="" disabled >Month</option>
                  <option value="1" >January</option>
                  <option value="2" >February</option>
                  <option value="3" >March</option>
                  <option value="4" >April</option>
                  <option value="5" >May</option>
                  <option value="6" >June</option>
                  <option value="7" >July</option>
                  <option value="8" >August</option>
                  <option value="9" >September</option>
                  <option value="10" >October</option>
                  <option value="11" >November</option>
                  <option value="12" >December</option>
                </select>
              </div>

              <div className="MD">
                <select className="birthday-select" onChange={this.handleBirthday("day")} value={this.state.day.toString()}>Day
                   <option value="" disabled>Day</option>
                  {this.state.daysArray}
                </select>
              </div>
            </div>
          </div>
          {this.state.errors.length === 0 ? <RenderDynamicMessages messages={this.state.messages} /> : <RenderDynamicErrors errors={this.state.errors} />}
          <input type="submit" className={this.state.submitClass} disabled={this.state.disabled} value="next" />

        </form>
      </div>
    )
  }
}

export default connect(msp, mdp)(BirthdayForm);
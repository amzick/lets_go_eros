import React from 'react';
import { connect } from 'react-redux';
import { signup, RECEIVE_SESSION_ERRORS, clearErrors } from '../../actions/session_actions';
import RenderErrors from '../errors/render_errors';

const msp = state => {


  const possibleYears = [];
  const mostRecentValidYear = new Date().getFullYear() - 18;
  for (let i = mostRecentValidYear; i >= 1900; i--) {
    possibleYears.push(i);
  }
  const yearsArray = possibleYears.map((year) => {
    return <option value={year.toString()} key={year}>{year}</option>;
  });

  //todo: I'm having to retrieve an actual date because trying to submit a non date object breaks the site
  const today = new Date();


  return {
    errors: state.errors.session,
    formType: "Sign Up",
    currentUser: state.entities.users[state.session.id],
    user: { email: "", password: "", fname: "", location: "", birthday: today, month: (today.getMonth() + 1), day: today.getDate(), year: today.getFullYear() },
    yearsArray,
  };
};

const mdp = dispatch => {
  return {
    signup: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.user;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidMount() {
    //TODO - remove this
    alert("Styling this now - 1.25.18 pm. Is functional however");
  }

  handleChange(field) {

    return (event) => {
      this.setState({
        [field]: event.target.value
      });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const newUser = ({
      "email": this.state.email,
      "password": this.state.password,
      "fname": this.state.fname,
      "birthday": new Date((`${this.state.year}-${this.state.month}-${this.state.day}`)),
      "location": parseInt(this.state.location),
    });
    this.props.signup(newUser);

  }

  handleBirthday(field) {
    return (event) => {

      this.setState({
        [field]: event.target.value
      });
    };
  }

  handleLocation(event) {
    // todo: location API (awaiting Bing key). 
    // other option: http://www.zippopotam.us/ (no distance matrix)
    this.setState({
      "location": event.target.value
    });
  }
  render() {

    const { formType, yearsArray } = this.props;
    const { email, password, fname, birthday, location } = this.state;
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
        <form onSubmit={this.handleSubmit}>{formType}
          <label>Email:
          <input type="text" value={email} onChange={this.handleChange("email")} placeholder="Email" />
          </label>

          <label>Password:
          <input type="password" value={password} onChange={this.handleChange("password")} placeholder="Password" />
          </label>

          <label>First Name:
          <input type="text" value={fname} onChange={this.handleChange("fname")} placeholder="First Name" />
          </label>


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

          <label>Location:
          <input type="text" value={this.state.location} onChange={this.handleLocation} placeholder="Zip Code" />
          </label>




          <input type="submit" value={formType} />
        </form >
        <RenderErrors errors={this.props.errors} />
      </div>
    );
  }
}

export default connect(msp, mdp)(SignupForm);
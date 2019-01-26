import React from 'react';
import { connect } from 'react-redux';
import DynamicInput from '../dynamic_input';


// import EmailForm from './email_form';
// import PasswordForm from './password_form';

const msp = state => {
  return {

  };
};

const mdp = dispatch => {
  return {

  };
};

class WhoAreYouSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = props.newUser;

  }

  handleChange(field) {
    console.log(`updating ${field}`);
    return (event) => {
      this.setState({
        [field]: event.target.value
      });
    };
  }

  render() {
    return (
      <form >{this.props.field}
        <DynamicInput handleChange={this.handleChange} field={this.props.field} />
        <input type="submit" />
      </form>
    )
  }
}

// const WhoAreYouSwitcher = (props) => {
//   if (props.formType === "email") {
//     return <EmailForm formType={props.formType}/>;
//   } else if (props.formType === "password") {
//     return <PasswordForm formType={props.formType} />
//   }
// };

export default connect(msp, mdp)(WhoAreYouSwitcher);

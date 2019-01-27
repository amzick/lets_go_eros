import React from 'react';
import RenderDynamicErrors from '../../errors/render_dynamic_errors';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';

import { updateField, updateNewUser, receiveErrors } from '../../../actions/ui_actions';
import { validateField } from '../../../util/ui_util';
import { clearErrors } from '../../../actions/session_actions';

const msp = state => {
  return ({
    errors: state.errors.ui
  });
};

const mdp = dispatch => {
  return ({
    updateField: (field) => dispatch(updateField(field)),
    updateNewUser: (datum) => dispatch(updateNewUser(datum)),
    receiveErrors: (errors) => dispatch(receiveErrors(errors)),
    clearErrors: () => dispatch(clearErrors()),
  });
};


class PasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.newUser = props.newUser;
    this.state.errors = props.errors;
    this.state.submitClass = "invalid-submit";
    this.state.disabled = "disabled";
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  //dispatch to update state
  handleSubmit(event) {
    // event.preventDefault(); we'll allow default because this is a link
    this.props.handler("password");
    this.props.updateField("password");
    this.props.updateNewUser({ field: "password", value: this.state.newUser.password });
  }

  // handle errors and update button class
  handleChange(field) {

    return event => {
      const setUser = merge({}, this.state.newUser);
      setUser[field] = event.target.value;

      this.setState({ newUser: setUser });

      if (event.target.value !== "") {
        this.setState({ errors: [] });
        validateField(field, event.target.value)
          .then(
            (resp) => {
              this.setState({ errors: [], disabled: "", submitClass: "valid-submit" });
            },
            (bad) => {
              // this.props.receiveErrors(bad.responseJSON);
              this.setState({ errors: bad.responseJSON, disabled: "disabled", submitClass: "invalid-submit" });
            }
          );
      } else {
        this.setState({ errors: ["Password can't be empty"], disabled: "disabled", submitClass: "invalid-submit" });
      }
    };
  }

  componentWillUnmount() {
    this.props.clearErrors();
    this.setState({ errors: [] });
  }

  render() {

    return (
      <div className="dynamic-input-div"><h1 className="dynamic-input-message">Create a password</h1>
        <form className="session-form" >
          <label><RenderDynamicErrors errors={this.state.errors} />
            <input className="session-form-input" onChange={this.handleChange("password")} type="password" value={this.state["password"]} placeholder="6 characters minimum" ></input>
          </label>
          <Link onClick={this.handleSubmit} to="/onboarding"><input type="submit" className={this.state.submitClass} disabled={this.state.disabled} value="Tell Us More!" /></Link>

        </form>
      </div>
    )
  }
}

export default connect(msp, mdp)(PasswordForm);
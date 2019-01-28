import React from 'react';
import { connect } from 'react-redux';
import RenderDynamicErrors from '../../errors/render_dynamic_errors';
import { merge } from 'lodash';

import { updateField, updateNewUser, receiveErrors } from '../../../actions/ui_actions';
import { validateField } from "../../../util/ui_util";
import { clearErrors } from '../../../actions/session_actions';


const msp = state => {
  return ({
    errors: state.errors.ui,
    newUser: state.ui.newUser
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


class FnameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.newUser = props.newUser;
    this.state.errors = props.errors;
    this.state.submitClass = (props.newUser.fname === "" ? "invalid-submit" : "valid-submit");
    this.state.disabled = (props.newUser.fname === "" ? "disabled" : "");
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //dispatch to update state
  handleSubmit(event) {
    event.preventDefault();
    this.props.handler("gender");
    this.props.updateField("gender");
    this.props.updateNewUser({ field: "fname", value: this.state.newUser.fname });
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
              this.setState({ errors: bad.responseJSON, disabled: "disabled", submitClass: "invalid-submit" });
              // this.props.receiveErrors(bad.responseJSON);
            }
          );
      } else {
        this.setState({ errors: ["First name can't be empty"], disabled: "disabled", submitClass: "invalid-submit" });
      }
    };
  };

  componentWillUnmount() {
    this.props.clearErrors();
    this.setState({ errors: [] });
  }

  render() {


    return (
      <div className="dynamic-input-div"><h1 className="dynamic-input-message">What's your first name?</h1>
        <form className="session-form" onSubmit={this.handleSubmit}>
          <label><RenderDynamicErrors errors={this.state.errors} />
            <input className="session-form-input" onChange={this.handleChange("fname")} type="text" value={this.state.newUser["fname"]} placeholder="Eros" ></input>
          </label>
          <button className={this.state.submitClass} disabled={this.state.disabled}>next</button>

        </form>
      </div>
    )
  }
}

export default connect(msp, mdp)(FnameForm);
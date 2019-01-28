import React from 'react';
import { connect } from 'react-redux';
import RenderDynamicErrors from '../../errors/render_dynamic_errors';
import RenderDyanmicMessages from '../../errors/render_dynamic_messages';
import { merge } from 'lodash';


import { updateField, updateNewUser, receiveErrors } from '../../../actions/ui_actions';
import { revealLocation, validateField } from "../../../util/ui_util";
import { signup, clearErrors } from '../../../actions/session_actions';


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
    signup: (user) => dispatch(signup(user)),
  });
};


class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.newUser = props.newUser;
    this.state.errors = props.errors;
    this.state.submitClass = (props.newUser.location === "" ? "invalid-submit" : "valid-submit");
    this.state.disabled = (props.newUser.location === "" ? "disabled" : "");
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state.messages = [];
  }

  //dispatch to update state
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateNewUser({ field: "location", value: this.state.newUser.location });

    const newUser = ({
      "email": this.state.newUser.email,
      "password": this.state.newUser.password,
      "fname": this.state.newUser.fname,
      "birthday": new Date(this.state.newUser.birthday),
      "location": parseInt(this.state.newUser.location)
    });
    this.props.signup(newUser);
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
              this.setState({ errors: [], disabled: "", submitClass: "valid-submit" },
                () => {
                  revealLocation(this.state.newUser.location)
                    .then(resp => {
                      this.setState({ messages: [`Ahh, ${resp.places[0]["place name"]}`], errors: [] });
                    },
                      errors => {
                        this.setState({ errors: ["Please enter an existing zip code"] });
                      });
                });
            },
            (bad) => {
              this.setState({ errors: bad.responseJSON, disabled: "disabled", submitClass: "invalid-submit" });
              // this.props.receiveErrors(bad.responseJSON);
            }
          );
      } else {
        this.setState({ errors: ["Location required"], disabled: "disabled", submitClass: "invalid-submit" });
      }
    };
  };

  componentDidMount() {
    this.props.clearErrors();
  }

  componentWillUnmount() {
    this.props.clearErrors();
    this.setState({ errors: [] });
  }

  render() {


    return (
      <div className="dynamic-input-div"><h1 className="dynamic-input-message">Where do you primarily live?</h1>
        <form className="session-form" onSubmit={this.handleSubmit}>
          <label>{this.state.errors.length === 0 ? <RenderDyanmicMessages messages={this.state.messages} /> : <RenderDynamicErrors errors={this.state.errors} />}
            <input className="session-form-input" onChange={this.handleChange("location")} type="text" value={this.state.newUser["location"]} placeholder="i.e. 10001" ></input>
          </label>
          <button className={this.state.submitClass} disabled={this.state.disabled}>next</button>

        </form>
      </div>
    )
  }
}

export default connect(msp, mdp)(LocationForm);
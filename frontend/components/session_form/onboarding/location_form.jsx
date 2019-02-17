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
    this.state.city = "";
    this.state.state = "";
    this.state.lat = 0;
    this.long = 0;
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
      "birthday": this.state.newUser.birthday,
      "gender_ids": Array.from(this.state.newUser.genders),
      "ethnicity_ids": Array.from(this.state.newUser.ethnicities),
      "location": this.state.newUser.location,
      "city": this.state.city,
      "state": this.state.state,
      "lat": this.state.lat,
      "lng": this.state.lng
    });

    // const _newUser = {
    //   email: "",
    //   password: "",
    //   fname: "",
    //   genders: new Set(),
    //   ethnicities: new Set(),
    //   birthday: new Date(),
    //   location: undefined
    // };

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
                  let that = this;
                  revealLocation(this.state.newUser.location)
                    .then(resp => {

                      if (resp.status !== "ZERO_RESULTS") {
                        that.setState({
                          messages: [`Ahh, ${resp.results[0].address_components[1].long_name}`],
                          errors: [],
                          city: resp.results[0].address_components[1].long_name,
                          state: resp.results[0].address_components[3].short_name,
                          lat: resp.results[0].geometry.location.lat,
                          lng: resp.results[0].geometry.location.lng,
                        });
                      } else {
                        that.setState({ errors: ["Please enter an existing zip code"], submitClass: "invalid-submit" });
                      }
                    },
                      errors => {
                        this.setState({ errors: ["Please enter an existing zip code"], submitClass: "invalid-submit" });
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
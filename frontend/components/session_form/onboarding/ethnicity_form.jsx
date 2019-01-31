import React from 'react';
import { connect } from 'react-redux';
import { merge } from 'lodash';

import { fetchOptions } from '../../../actions/ui_actions';
import { updateField, updateNewUser } from '../../../actions/ui_actions';
import RenderDynamicErrors from '../../errors/render_dynamic_errors';



const msp = state => {

  return ({
    errors: state.errors.ui,
    options: Object.values(state.ui.options),
    newUser: state.ui.newUser,
  });
};

const mdp = dispatch => {
  return ({
    fetchOptions: (options) => dispatch(fetchOptions(options)),
    updateField: (field) => dispatch(updateField(field)),
    updateNewUser: (datum) => dispatch(updateNewUser(datum)),
  });
};

class EthnicityForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.newUser = props.newUser;
    this.state.errors = props.errors;
    this.state.submitClass = (this.state.newUser.ethnicities.length < 6 && this.state.newUser.ethnicities.length >= 1 ? "valid-submit" : "invalid-submit");
    this.state.disabled = ((this.state.newUser.ethnicities.length < 6 && this.state.newUser.ethnicities.length >= 1) ? "" : "disabled");
    this.handleToggle = this.handleToggle.bind(this);
    this.validateOptions = this.validateOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.itemChecked = this.itemChecked.bind(this);

  }

  componentDidMount() {
    this.props.fetchOptions("ethnicities");
  }

  handleToggle(event) {
    // need to either add the ethnicity ID into the array if not there or add it if it is there
    // event.preventDefault();
    let idx = this.state.newUser.ethnicities.indexOf(event.target.value);
    let setUser;
    let badIdx = this.state.newUser.ethnicities.indexOf(undefined);
    if (idx === -1) {
      console.log("adding race");
      setUser = merge({}, this.state.newUser);
      setUser.ethnicities.push(event.target.value);
      this.setState({ newUser: setUser }, () => {
        badIdx = this.state.newUser.ethnicities.indexOf(undefined);
        if (badIdx !== -1) {
          setUser.ethnicities.splice(badIdx, 1);
          this.setState({ newUser: setUser }, () => this.validateOptions);
          // this.props.updateNewUser({ field: "ethnicities", value: setUser.ethnicities });
          // this.validateOptions();
        }
        this.validateOptions();
        console.log(this.state.newUser.ethnicities);

      });
    } else {
      console.log("removing race");
      setUser = merge({}, this.state.newUser);
      setUser.ethnicities.splice(idx, 1);
      this.setState({ newUser: setUser }, () => {
        badIdx = this.state.newUser.ethnicities.indexOf(undefined);
        if (badIdx !== -1) {
          setUser.ethnicities.splice(badIdx, 1);
          this.setState({ newUser: setUser }, this.validateOptions);
        }
        this.validateOptions();
        console.log(this.state.newUser.ethnicities);

      });
    }

  }

  itemChecked(id) {
    return this.state.newUser.ethnicities.includes(id);
    // this.setState({isChecked});
  }

  validateOptions() {

    if (this.state.newUser.ethnicities.length > 0 && this.state.newUser.ethnicities.length < 6) {
      this.setState({ errors: [], disabled: "", submitClass: "valid-submit" });
    } else if (this.state.newUser.ethnicities.length < 1) {
      this.setState({ errors: ["Please select at least one ethnicity"], disabled: "disabled", submitClass: "invalid-submit" });
    } else {
      this.setState({ errors: ["Please select fewer than five ethnicities"], disabled: "disabled", submitClass: "invalid-submit" });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handler("birthday");
    this.props.updateField("birthday");
    this.props.updateNewUser({ field: "ethnicities", value: this.state.newUser.ethnicities });
  }

  render() {

    this.checkBoxItems = this.props.options.map(option => {
      const isChecked = this.itemChecked(option.id);
      return <label onClick={this.handleToggle} key={option.id}>{option.ethnicity}<input type="checkbox" value={option.id} defaultChecked={isChecked} readOnly={false} /></label>
    });

    return (
      <div className="dynamic-input-div">
        <h1>Which ethnicity best describes you?</h1>
        <form onSubmit={this.handleSubmit}>
          {this.checkBoxItems}
          <RenderDynamicErrors errors={this.state.errors} />
          <button className={this.state.submitClass} disabled={this.state.disabled}>next</button>
        </form>
      </div >
    );
  }
}

export default connect(msp, mdp)(EthnicityForm);
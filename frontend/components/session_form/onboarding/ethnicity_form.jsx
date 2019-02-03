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
    this.state.submitClass = (this.state.newUser.ethnicities.size < 6 && this.state.newUser.ethnicities.size >= 1 ? "valid-submit" : "invalid-submit");
    this.state.disabled = ((this.state.newUser.ethnicities.size < 6 && this.state.newUser.ethnicities.size >= 1) ? "" : "disabled");

    this.handleToggle = this.handleToggle.bind(this);
    this.validateOptions = this.validateOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    this.props.fetchOptions("ethnicities");
  }

  handleToggle(event) {
    $(event.currentTarget).toggleClass("checkbox-item-checked");
    $(event.currentTarget).toggleClass("checkbox-item-unchecked");

    let setUser = this.state.newUser;

    if (setUser.ethnicities.has(parseInt(parseInt(event.target.id)))) {
      setUser.ethnicities.delete(parseInt(parseInt(event.target.id)));
    } else {
      setUser.ethnicities.add(parseInt(parseInt(event.target.id)));
    }
    this.setState({ newUser: setUser }, this.validateOptions);

  }

  
  validateOptions() {

    if (this.state.newUser.ethnicities.size > 0 && this.state.newUser.ethnicities.size < 6) {
      this.setState({ errors: [], disabled: "", submitClass: "valid-submit" });
    } else if (this.state.newUser.ethnicities.size < 1) {
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
      return <input type="button" className={this.state.newUser.ethnicities.has(option.id) ? "checkbox-item-checked" : "checkbox-item-unchecked"} onClick={this.handleToggle} key={option.id} id={option.id} value={option.ethnicity} />;
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
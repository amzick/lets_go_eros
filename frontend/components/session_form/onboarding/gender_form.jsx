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

class GenderForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    // bad - don't want to mess with
    this.state.newUser = props.newUser;
    
    this.state.errors = props.errors;
    this.state.submitClass = (this.state.newUser.genders.size < 6 && this.state.newUser.genders.size >= 1 ? "valid-submit" : "invalid-submit");
    this.state.disabled = ((this.state.newUser.genders.size < 6 && this.state.newUser.genders.size >= 1) ? "" : "disabled");
    
    this.handleToggle = this.handleToggle.bind(this);
    this.validateOptions = this.validateOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    this.props.fetchOptions("genders");
  }

  handleToggle(event) {
    $(event.currentTarget).toggleClass("checkbox-item-checked");
    $(event.currentTarget).toggleClass("checkbox-item-unchecked");
    
    let setUser = this.state.newUser;

    if (setUser.genders.has(parseInt(parseInt(event.target.id)))) {
      setUser.genders.delete(parseInt(parseInt(event.target.id)));
    } else {
      setUser.genders.add(parseInt(parseInt(event.target.id)));
    }
    this.setState({ newUser: setUser }, this.validateOptions);


  }

  validateOptions() {
    if (this.state.newUser.genders.size > 0 && this.state.newUser.genders.size < 6) {
      this.setState({ errors: [], disabled: "", submitClass: "valid-submit" });
    } else if (this.state.newUser.genders.size < 1) {
      this.setState({ errors: ["Please select at least one gender"], disabled: "disabled", submitClass: "invalid-submit" });
    } else {
      this.setState({ errors: ["Please select fewer than five genders"], disabled: "disabled", submitClass: "invalid-submit" });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handler("ethnicity");
    this.props.updateField("ethnicity");
    this.props.updateNewUser({ field: "genders", value: this.state.newUser.genders });
  }

  render() {
  

    this.checkBoxItems = this.props.options.map(option => {
      return <input type="button" className={this.state.newUser.genders.has(option.id) ? "checkbox-item-checked" : "checkbox-item-unchecked"} onClick={this.handleToggle} key={option.id} id={option.id} value={option.gender} />;
    });
    
    return (
      <div className="dynamic-input-div">
        <h1 className="dynamic-input-message">Which gender best describes you?</h1>
        <form  className="checkbox-form" onSubmit={this.handleSubmit}>
          <div className="checkbox-form-div">{this.checkBoxItems}</div>
          <RenderDynamicErrors errors={this.state.errors} />
          <input type="submit" className={this.state.submitClass} disabled={this.state.disabled} value="next"/>
        </form>
      </div >
    );
  }
}

export default connect(msp, mdp)(GenderForm);
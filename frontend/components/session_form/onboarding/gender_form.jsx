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
    this.state.newUser = props.newUser;
    this.state.errors = props.errors;
    this.state.submitClass = (this.state.newUser.genders.length < 6 && this.state.newUser.genders.length >= 1 ? "valid-submit" : "invalid-submit");
    this.state.disabled = ((this.state.newUser.genders.length < 6 && this.state.newUser.genders.length >= 1) ? "" : "disabled");
    this.state.toggled = 0;
    this.handleToggle = this.handleToggle.bind(this);
    this.validateOptions = this.validateOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.itemChecked = this.itemChecked.bind(this);

  }

  componentDidMount() {
    this.props.fetchOptions("genders");
  }

  handleToggle(event) {
    // need to either add the gender ID into the array if not there or add it if it is there
    // event.preventDefault();
    let idx = this.state.newUser.genders.indexOf(event.target.value);
    let setUser;
    let badIdx = this.state.newUser.genders.indexOf(undefined);
    if (idx === -1) {
      
      setUser = merge({}, this.state.newUser);
      setUser.genders.push(event.target.value);
      this.setState({ newUser: setUser }, () => {
        badIdx = this.state.newUser.genders.indexOf(undefined);
        if (badIdx !== -1) {
          setUser.genders.splice(badIdx, 1);
          this.setState({ newUser: setUser }, () => this.validateOptions);
          // this.props.updateNewUser({ field: "genders", value: setUser.genders });
          // this.validateOptions();
        }
        this.validateOptions();
        
      });
    } else {
      
      setUser = merge({}, this.state.newUser);
      setUser.genders.splice(idx, 1);
      this.setState({ newUser: setUser }, () => {
        badIdx = this.state.newUser.genders.indexOf(undefined);
        if (badIdx !== -1) {
          setUser.genders.splice(badIdx, 1);
          this.setState({ newUser: setUser }, this.validateOptions);
        }
        this.validateOptions();
        

      });
    }
    
  }

  itemChecked(id) {
    return this.state.newUser.genders.includes(id);
    // this.setState({isChecked});
  }

  validateOptions() {

    if (this.state.newUser.genders.length > 0 && this.state.newUser.genders.length < 6) {
      this.setState({ errors: [], disabled: "", submitClass: "valid-submit" });
    } else if (this.state.newUser.genders.length < 1) {
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
      const isChecked = this.itemChecked(option.id);
      return <label className={isChecked ? "checkbox-item-checked" : "checkbox-item-unchecked"} onClick={this.handleToggle} for={option.id} key={option.id}>{option.gender}<input type="checkbox" value={option.id} defaultChecked={isChecked} readOnly={false} id={option.id}  /></label>
    });
    
    return (
      <div className="dynamic-input-div">
        <h1 className="dynamic-input-message">Which gender best describes you?</h1>
        <form  className="checkbox-form" onSubmit={this.handleSubmit}>
          <div className="checkbox-form-div">{this.checkBoxItems}</div>
          {/* <div className="checkbox-spacing" /> */}
          <RenderDynamicErrors errors={this.state.errors} />
          <button className={this.state.submitClass} disabled={this.state.disabled}>next</button>
        </form>
      </div >
    );
  }
}

export default connect(msp, mdp)(GenderForm);
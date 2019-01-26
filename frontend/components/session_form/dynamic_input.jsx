import React from 'react';
import { connect } from 'react-redux';
import RenderDynamicErrors from '../errors/render_dynamic_errors';

const msp = state => {
  return {

  };
};

const mdp = dispatch => {
  return {

  };
};

class DynamicInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.newUser;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //dispatch to update state
  handleSubmit(event) {

  }

  handleChange(field) {
    console.log(this.state);
    return event => {
      this.setState({
        [field]: event.target.value
      })
    };
  };

  render() {
    console.log(this.state)
    return (
      <div className="dynamic-input-div"><h1 className="dynamic-input-message">{this.props.message}</h1>
        <form className="session-form" onSubmit={this.props.action}>
          <label><RenderDynamicErrors errors={["Error Message"]} />
            <input className="session-form-input" onChange={this.handleChange(this.props.field)} type="text" value={this.state[this.props.field]} placeholder={this.props.placeholder} type={this.props.inputType}></input>
          </label>
          {this.props.button}

        </form>
      </div>
    )
  }
}

export default connect(msp, mdp)(DynamicInput);
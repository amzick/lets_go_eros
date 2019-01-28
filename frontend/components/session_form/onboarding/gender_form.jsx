import React from 'react';
import { connect } from 'react-redux';
import { fetchOptions } from '../../../actions/ui_actions';

const msp = state => {
  debugger
  return ({
    errors: state.errors.ui,
    options: Object.values(state.ui.options),
  });
};

const mdp = dispatch => {
  return ({
    fetchOptions: (options) => dispatch(fetchOptions(options)),
  });
};

class GenderForm extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    console.log("gender mounted");
    this.props.fetchOptions("genders");
  }

  render() {

    return (
      <div>
        GenderForm
        <ul>{this.props.options}</ul>
      </div>
    )
  }
}

export default connect(msp, mdp)(GenderForm);
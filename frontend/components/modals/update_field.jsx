import React from 'react';
import { connect } from 'react-redux';

import { updateUser } from '../../actions/user_actions';
import { closeModal } from '../../actions/modal_actions';

const mdp = dispatch => {
  return({
    updateUser: (user) => dispatch(updateUser(user)),
    closeModal: () => dispatch(closeModal()),
  });
};

class UpdateField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [props.field]: props.user[props.field],
      submitClass: "valid-submit",
      disabled:"",
      submitValue: "Update"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[this.props.field]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {user, field} = this.props;
    const that = this;
    this.setState({submitValue: "Updating...", disabled:"disabled", submitClass:"processing-submit"}, () => {
      this.props.updateUser({
        id: user.id,
        [field]: this.state[this.props.field]
      }).then(resp => {
        this.setState({submitValue: "Updated!"}, () => {
          setTimeout(that.props.closeModal, 500);
        });
      });
    });
  }

  render() {
    const {field} = this.props;
    
    return (
      <div className="new-message-div">
        <h2>Update your {field}:</h2>
        <textarea placeholder={`Enter ${field}`} value = {this.state[this.props.field]} onChange={this.handleChange} />
        <input type = "submit" onClick={this.handleSubmit} className={this.state.submitClass} disabled={this.setState.disabled} value={this.state.submitValue} />
      </div>
    );
  }
}

export default connect(null, mdp)(UpdateField);

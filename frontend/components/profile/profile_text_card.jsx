import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';

const mdp = dispatch => {
  return({
  openModal: (modalData) => () => dispatch(openModal("updateUser", modalData)),
  });
};

class ProfileTextCard extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const { pageUser, header, text } = this.props;
    
    return (
      <div className="profile-text-card">
        <div className="profile-text-card-header">
          <h2>{header}:</h2>
          {pageUser.id === currentUser.id ? <i className="fas fa-pencil-alt" onClick={this.props.openModal({ user: pageUser, field: this.props.field })}></i> : null}
        </div>
        <p>{text ? text : <i className="null-info">{`${pageUser.fname} hasn't filled this out yet!`}</i>}</p>
      </div>
    )
  }
}

export default connect(null,mdp)(ProfileTextCard);
import React from 'react';

class ProfileTextCard extends React.Component {

  render() {
    const { pageUser, header, text } = this.props;

    return (
      <div className="profile-text-card">
        <div className="profile-text-card-header">
          <h2>{header}:</h2>
          {pageUser.id === currentUser.id ? <i class="fas fa-pencil-alt"></i> : null}
        </div>
        <p>{text ? text : <i className="null-info">{`${pageUser.fname} hasn't filled this out yet!`}</i>}</p>
      </div>
    )
  }
}

export default ProfileTextCard;
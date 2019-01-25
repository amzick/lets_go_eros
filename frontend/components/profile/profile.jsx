import React from 'react';
import { Link } from 'react-router-dom';

class Profile extends React.Component {

  render() {

    const { profile_pictures } = this.props.currentUser;


    const profilePictureLIs = profile_pictures.map((url) => {
      // TODO make containers
      return <li key={url}><img src={url} /></li>;
    });
    return (
      <div>
        <h2>Greetings {this.props.currentUser.fname}, you are signed in </h2>
        <Link to="/logout">Log Out</Link>
        <h2>Profile Pictures:</h2>
        <ul>{profilePictureLIs}</ul>
      </div>
    )
  }
}

export default Profile;
import React from 'react';
import { connet } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';

class MessageCard extends React.Component {

  render() {
    const { cardUser } = this.props;
    let profilePictureSrc;
    if (cardUser.bot_img_src) {
      profilePictureSrc = cardUser.bot_img_src;
    } else {
      const profilePictureLastIndex = cardUser.profile_pictures.length - 1;
      profilePictureSrc = cardUser.profile_pictures[profilePictureLastIndex] || "https://s3.amazonaws.com/letsgoeros-dev/Eros.jpeg";
    }

    return (

      <div className="messagecard-div">
        <div className="messagecard-thumb">
          <img src={profilePictureSrc} />
        </div>
        <div className="messagecard-text">
          <div className="messagecard-text-header">
            <h2>{cardUser.fname}, {cardUser.age}</h2>
            <p>Time of creation</p>
          </div>
          <div>
            Most recent message content!
          </div>
        </div>
      </div>
    )


  }
}

export default MessageCard;
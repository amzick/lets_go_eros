import React from 'react';

const MessageIndexItem = ({ message, sender_id, currentUser, userPicture, currentUserPicture, sent_at }) => {
  return (
    <li className="message-index-item">
      <div className="message-index-item-thumb">
        <img src={sender_id === currentUser.id ? currentUserPicture : userPicture} />
      </div>
      <div className="message-index-item-message">
        <p>{message}</p>
        <p className="message-index-item-message-sent-at">{sent_at}</p>
      </div>
      

    </li>
  );
};

export default MessageIndexItem;
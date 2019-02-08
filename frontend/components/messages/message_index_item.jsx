import React from 'react';

const MessageIndexItem = ({message, sender_id, userPicture, currentUserPicture}) => {
  return(
    <li>
      {message}, {sender_id}
    </li>
  );
};

export default MessageIndexItem;
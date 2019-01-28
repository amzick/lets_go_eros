import React from 'react';


const RenderDyanmicMessages = props => {
  return (
    <ul className="dynamic-good-messages">
      {props.messages.map((message, index) => {
        return <li key={`message-${index}`}>
          {message}
        </li>
      })}
    </ul>
  )
}

export default RenderDyanmicMessages;
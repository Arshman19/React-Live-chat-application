import React from 'react';
import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ message: { text, user }, name }) => {
  const isSentByCurrentUser = user === name.trim().toLowerCase();

  return (
    <div className={`messageContainer ${isSentByCurrentUser ? 'justifyEnd' : 'justifyStart'}`}>
      <p className="sentText">{user}</p>
      <div className={`messageBox ${isSentByCurrentUser ? 'backgroundBlue' : 'backgroundLight'}`}>
        <p className="messageText">{text}</p>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
};

export default Message;

// import React from "react";

// import "./Message.css";

// import ReactEmoji from "react-emoji";

// const Message = ({ message: { text, user }, name }) => {
//   let isSentByCurrentUser = false;

//   const trimmedName = name.trim().toLowerCase();

//   if (user === trimmedName) {
//     isSentByCurrentUser = true;
//   }

//   return isSentByCurrentUser ? (
//     <div className="messageContainer justifyEnd">
//       <p className="sentText pr-10">{trimmedName}</p>
//       <div className="messageBox backgroundBlue">
//         <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
//       </div>
//     </div>
//   ) : (
//     <div className="messageContainer justifyStart">
//       <div className="messageBox backgroundLight">
//         <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
//       </div>
//       <p className="sentText pl-10 ">{user}</p>
//     </div>
//   );
// };

// export default Message;

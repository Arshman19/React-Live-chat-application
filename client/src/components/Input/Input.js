import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          sendMessage(event);
        }
      }}
    />
    <button
      className="sendButton"
      onClick={(e) => sendMessage(e)}
      type="button"
    >
      Send
    </button>
  </form>
);

Input.propTypes = {
  setMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default Input;

// import React from 'react';

// import './Input.css';

// const Input = ({ setMessage, sendMessage, message }) => (
//   <form className="form">
//     <input
//       className="input"
//       type="text"
//       placeholder="Type a message..."
//       value={message}
//       onChange={({ target: { value } }) => setMessage(value)}
//       onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null
//       }
//     />
//     <button className="sendButton" onClick={(e) => sendMessage(e)}>
//       Send
//     </button>
//   </form>
// );

// export default Input;

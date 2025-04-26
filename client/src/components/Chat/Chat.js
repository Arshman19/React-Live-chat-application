import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import io from 'socket.io-client';

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'https://react-live-chat-application-backend.onrender.com';
let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name: queryName, room: queryRoom } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(queryRoom);
    setName(queryName);

    socket.emit('join', { name: queryName, room: queryRoom }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [location.search]);

  useEffect(() => {
    socket.on('message', (incomingMessage) => {
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    });

    socket.on('roomData', ({ users: roomUsers }) => {
      setUsers(roomUsers);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

Chat.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default Chat;

// import React, { useState, useEffect } from 'react';
// import queryString from 'query-string';
// import io from 'socket.io-client';

// import TextContainer from '../TextContainer/TextContainer';
// import Messages from '../Messages/Messages';
// import InfoBar from '../InfoBar/InfoBar';
// import Input from '../Input/Input';

// import './Chat.css';

// // const ENDPOINT = 'https://project-chat-application.herokuapp.com/';
// const ENDPOINT = 'localhost:5000';

// let socket;

// const Chat = ({ location }) => {
//   const [name, setName] = useState('');
//   const [room, setRoom] = useState('');
//   const [users, setUsers] = useState('');
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const { name, room } = queryString.parse(location.search);

//     socket = io(ENDPOINT);

//     setRoom(room);
//     setName(name);

//     socket.emit('join', { name, room }, (error) => {
//       if (error) {
//         alert(error);
//       }
//     });
//   }, [ENDPOINT, location.search]);
//   useEffect(() => {
//     socket.on('message', (message) => {
//       setMessages((messages) => [...messages, message]);
//     });

//     socket.on('roomData', ({ users }) => {
//       setUsers(users);
//     });
//   }, []);

//   const sendMessage = (event) => {
//     event.preventDefault();

//     if (message) {
//       socket.emit('sendMessage', message, () => setMessage(''));
//     }
//   };

//   return (
//     <div className="outerContainer">
//       <div className="container">
//         <InfoBar room={room} />
//         <Messages messages={messages} name={name} />
//         <Input
//           message={message}
//           setMessage={setMessage}
//           sendMessage={sendMessage}
//         />
//       </div>
//       <TextContainer users={users} />
//     </div>
//   );
// };

// export default Chat;

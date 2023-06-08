import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './ConnectionState';
import { ConnectionManager } from './ConnectionManager';
import { MyForm } from './MyForm';

import { Events } from './Events';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={ isConnected } />
      <Events events={ fooEvents } />
      <ConnectionManager />
      <MyForm />
    </div>
  );
}







// import React, { useState, useEffect  } from 'react';
// import './App.css';
// import { socket } from './socket';

// function App() {

//   const [messages, setMessages] = useState([ ]);

//   const [message, setMessage] = useState('');




//   const handleChange = event => {
//     setMessage(event.target.value);
//   };
//      function addMessage() {
//       socket.emit('send-message-all', message)
//       //setMessages(messages => [...messages, message])
//       setMessage('')
//   };

//   socket.on('send-back-message', msg =>{
//     setMessages(messages => [...messages, msg])
//   })

//   useEffect(() => {
//     socket.on('connect', () =>{
//       setMessages(messages => [...messages, 'YOU CONNECTED '+socket.id])
//     })
//   }, []);












//   return (
//     <div className="App">
//       <div className='container'>
//         <div className='all-messages'>
//         {messages.map(msg =>
//                         <p key={msg}>
//                           {msg}
//                         </p>
//                     )}
//         </div>
//         <input
//         type="text"
//         id="message"
//         name="message"
//         onChange={handleChange}
//         value={message}
//       />
//         <button onClick={addMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default App;

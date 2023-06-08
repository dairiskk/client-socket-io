import React, { useState } from 'react';
import { socket } from './socket';

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(2000).emit('send-message-all', value, () => {
      setIsLoading(false);
    });
  }

    socket.on('send-back-message', msg =>{
    setMessages(messages => [...messages, msg])
  })

  return (
    <form onSubmit={ onSubmit }>
        {messages.map(msg =>
                        <p key={msg}>
                          {msg}
                        </p>
                    )}
      <input onChange={ e => setValue(e.target.value) } />

      <button type="submit" disabled={ isLoading }>Submit</button>
    </form>
  );
}
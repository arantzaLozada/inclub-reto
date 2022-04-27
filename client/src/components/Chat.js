import React, { useState, useEffect, useRef } from 'react';
import socket from './Socket';

export const Chat = ({ name }) => {
  const [message, setMessage] = useState('');
  const [messages, setmessages] = useState([]);

  useEffect(() => {
    socket.emit('conneting', name);
  }, [name]);

  useEffect(() => {
    socket.on('messages', (message) => {
      setmessages([...messages, message]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const submit = (e) => {
    e.preventDefault();
    socket.emit('message', name, message);
    setMessage('');
  };

  return (
    <div>
      <div className="border-2 border-cyan-600 block my-4 rounded-md ">
        {messages.map((e, i) => (
          <div className="bg-chat p-2" key={i}>
            <div className="py-1">{e.name}</div>
            <div>{e.message}</div>
          </div>
        ))}
        <div ref={divRef}></div>
      </div>
      <form onSubmit={submit}>
        <label className="block font-bold text-gray-600 py-5">
          Write your message:
        </label>
        <textarea
          className="border-2 block my-4 rounded-md"
          cols="30"
          rows="10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg mx-auto">
          Send
        </button>
      </form>
    </div>
  );
};

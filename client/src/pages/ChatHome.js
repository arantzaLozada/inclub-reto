import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chat } from '../components/Chat';

export function ChatHome() {
  const [name, setName] = useState('');
  const [registered, setRegistered] = useState(false);

  const register = (e) => {
    e.preventDefault();
    if (name !== '') {
      setRegistered(true);
    }
  };

  return (
    <div>
      <Link to="/" className=" px-4 py-2">
        Go to back
      </Link>
      {!registered && (
        <form onSubmit={register}>
          <label className="block font-bold text-gray-600 py-5">
            Enter your name:{' '}
          </label>
          <input
            className="border-2 block my-4"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg mx-auto">
            Go to chat
          </button>
        </form>
      )}

      {registered && <Chat name={name} />}
    </div>
  );
}

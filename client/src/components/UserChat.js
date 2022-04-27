// import { useState } from 'react';

export function UserChat({ users }) {
  // const [selectedPerson1, setSelectedPerson2] = useState(users[0]);

  return (
    <div className="pt-5">
      <h2 className="text-xl text-gray-600 font-medium">Register new chat:</h2>

      <div className="flex pb-5 pt-5">
        <div className="pr-10">
          <select name="" id="" className="bg-slate-100 py-2 px-2 rounded-md">
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.names}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select name="" id="" className="bg-slate-100 py-2 px-2 rounded-md">
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.names}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg mx-auto">
        Create Chat
      </button>
    </div>
  );
}

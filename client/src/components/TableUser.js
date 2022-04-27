import { useNavigate } from 'react-router-dom';

import { useUsers } from '../context/userContext';

// import toast from 'react-hot-toast';
import { VscAccount, VscEdit, VscTrash } from 'react-icons/vsc';

export function TableUser({ users }) {
  const { deleteUser } = useUsers();
  const navigate = useNavigate();

  // const handleDelete = (id, name) => {
  //   toast(
  //     (t) => (
  //       <div>
  //         <p className="text-white pb-4">
  //           Do you want to delete <strong>{name}</strong>?
  //         </p>
  //         <div>
  //           <button
  //             className="bg-gray-600 px-3 py-2 text-white rounded-sm mx-2"
  //             onClick={(e) => {
  //               deleteUser(id);
  //               toast.dismiss(t.id);
  //             }}
  //           >
  //             Delete
  //           </button>
  //           <button
  //             className="bg-slate-400  px-3 py-2 text-white rounded-sm mx-2"
  //             onClick={() => toast.dismiss(t.id)}
  //           >
  //             Cancel
  //           </button>
  //         </div>
  //       </div>
  //     ),
  //     {
  //       duration: '4000',
  //       style: {
  //         background: '#00ACC1',
  //       },
  //     }
  //   );
  // };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-500">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Names
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>

            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">
                {user.image ? (
                  <img
                    className="rounded-full w-14 h-14"
                    src={user.image.url}
                    alt={user.names}
                  />
                ) : (
                  <VscAccount className=" w-14 h-14" />
                )}
              </td>
              <td className="px-6 py-4">{user.names}</td>
              <td className="px-6 py-4">{user.email}</td>

              <td className="px-6 py-4">
                <div
                  className="inline-block bg-cyan-600 -mb-1 mr-2 px-2 py-1 rounded-sm cursor-pointer"
                  onClick={() => navigate(`/${user._id}`)}
                >
                  <VscEdit className="text-white" />
                </div>
                <button
                  className="bg-gray-600 px-2 py-1 rounded-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    // handleDelete(user._id, user.names);
                    deleteUser(id);
                  }}
                >
                  <VscTrash className="text-white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

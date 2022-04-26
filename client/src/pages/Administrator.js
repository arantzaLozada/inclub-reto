import { useUsers } from '../context/userContext';
import { Link } from 'react-router-dom';
import { VscAdd, VscEmptyWindow } from 'react-icons/vsc';
import { TableUser } from '../components/TableUser';
import { UserChat } from '../components/UserChat';

export function Administrator() {
  const { users } = useUsers();

  const renderUser = () => {
    if (users.length === 0)
      return (
        <div className="flex flex-col justify-center items-center">
          <VscEmptyWindow className="w-48 h-48 text-cyan-600" />
          <h1 className="text-white text-2xl">There are no users</h1>
        </div>
      );

    return (
      <section className="container flex gap-4">
        <div className="w-3/5">
          <TableUser users={users} />
        </div>
        <div className="w-2/5 border flex justify-center">
          <UserChat users={users} />
        </div>
      </section>
    );
  };

  return (
    <>
      <div>
        <Link to="/" className="text-gray-600 text-sm">
          Go Back
        </Link>
      </div>
      <main>
        <header className="flex justify-between w-3/5 items-center my-4">
          <h1 className="text-2xl text-gray-600 font-bold -mt-40">
            User manager ({users.length})
          </h1>
          <div>
            <Link
              to="/new"
              className="bg-orange-600 px-4 py-2 text-white hover:bg-orange-500 rounded-lg"
            >
              <VscAdd className="inline-block" /> Create User
            </Link>
          </div>
        </header>

        {renderUser()}
      </main>
    </>
  );
}

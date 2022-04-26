import { createContext, useContext, useEffect, useState } from 'react';
import {
  getUsersRequest,
  deleteUserRequest,
  createUserRequest,
  getUserRequest,
  updateUserRequest,
} from '../api/users';

const userContext = createContext();

export const useUsers = () => {
  const context = useContext(userContext);
  if (!context) throw new Error('Post Provider is missing');
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getUsersRequest();
      setUsers(res.data);
    })();
  }, []);

  const deleteUser = async (id) => {
    const res = await deleteUserRequest(id);
    if (res.status === 204) {
      setUsers(users.filter((user) => user._id !== id));
    }
  };

  const createUser = async (user) => {
    try {
      const res = await createUserRequest(user);
      setUsers([...users, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async (id) => {
    try {
      const res = await getUserRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (id, user) => {
    try {
      const res = await updateUserRequest(id, user);
      setUsers(users.map((user) => (user._id === id ? res.data : user)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <userContext.Provider
      value={{ users, deleteUser, createUser, getUser, updateUser }}
    >
      {children}
    </userContext.Provider>
  );
};

import { Routes, Route } from 'react-router-dom';
import { HomePage, NotFoundPage, UserForm } from './pages';
import { UserProvider } from './context/userContext';
import { Toaster } from 'react-hot-toast';
import { Administrator } from './pages/Administrator';
import { ChatHome } from './pages/ChatHome';

function App() {
  return (
    <div className="min-h-screen flex place-items-center">
      <div className="px-10 container m-auto py-4">
        <UserProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/administrator" element={<Administrator />} />
            <Route path="/new" element={<UserForm />} />
            <Route path="/chat" element={<ChatHome />} />
            <Route path="/:id" element={<UserForm />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster />
        </UserProvider>
      </div>
    </div>
  );
}

export default App;

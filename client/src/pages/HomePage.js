import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="container flex ">
      <Link
        to="/administrator"
        className="bg-cyan-600 text-white px-4 py-2 rounded-lg mx-auto"
      >
        LogIn Administrator
      </Link>
      <Link
        to="/chat"
        className="bg-orange-600 text-white px-4 py-2 rounded-lg mx-auto"
      >
        Enter your registered chat
      </Link>
    </div>
  );
}

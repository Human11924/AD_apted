import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../shared/lib/token";

function Navbar() {
  const navigate = useNavigate();
  const hasToken = !!getToken();

  function handleLogout() {
    removeToken();
    navigate("/auth/login");
  }

  return (
    <header className="border-b border-[#d6cec6] bg-[#f5efe8]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border">
            A
          </div>
          <span className="font-serif text-2xl">AdaptEd.</span>
        </Link>

        <nav className="hidden gap-10 text-lg md:flex">
          <Link to="/">Home</Link>
          <Link to="/dashboard/employer">Dashboard</Link>
          <Link to="/access-codes">Access Codes</Link>
          <Link to="/auth/login">Log In</Link>
        </nav>

        {hasToken ? (
          <button
            onClick={handleLogout}
            className="rounded-xl bg-[#2f211b] px-5 py-2 font-semibold text-white shadow"
          >
            Log Out
          </button>
        ) : (
          <Link
            to="/login"
            className="rounded-xl bg-yellow-400 px-5 py-2 font-semibold shadow"
          >
            Get Started
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
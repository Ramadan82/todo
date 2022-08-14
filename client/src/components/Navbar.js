import { Link } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useLogout } from "./hooks/useLogout";
const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleClick = (e) => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">Todo buddy </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>logut</button>
            </div>
          )}
          {!user && (
            <div>
              {" "}
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>{" "}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

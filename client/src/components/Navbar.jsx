import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Task Manager</div>
      <div className="navbar-right">
        {user && (
          <div className="navbar-user">
            <span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
            <span>{user.name}</span>
          </div>
        )}
        <button className="btn btn-outline btn-small" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

import "../Dropdown/Dropdown.scss";
import { Link } from "react-router-dom";

export default function Dropdown({
  setActiveDropdown,
  activeDropdown,
  signOutGoogle,
}) {
  return (
    <ul
      onClick={() => setActiveDropdown(false)}
      className={`dropdown ${activeDropdown ? "active" : ""}`}
    >
      <Link to="/" className="dropdown__items">
        <li>Home</li>
      </Link>
      <Link to="/profile" className="dropdown__items">
        <li>Profile</li>
      </Link>
      <Link to="/createpost" className="dropdown__items">
        <li>Create post</li>
      </Link>
      <button className="logOutBtn" onClick={signOutGoogle}>
        Log out
      </button>
    </ul>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import LoginUserProfile from "../LoginUserProfile/LoginUserProfile";
import reactLogo from "../../img/react.png";
import "../Nav/Nav.scss";

export default function Nav({ isAuth, setIsAuth, signOutGoogle, searchPost }) {
  const [active, setActive] = useState(false);
  const userAuth = auth.currentUser;

  useEffect(() => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 2000);

    return () => {
      clearTimeout();
    };
  }, [userAuth]);

  const handleSearchTitle = (event) => {
    searchPost(event.target.value);
  };

  return (
    <div>
      <nav className="nav">
        <div className="container nav__container">
          <Link to="/">
            <img className="react__logo" src={reactLogo} alt="react" />
          </Link>
          <div className="search__block">
            <input
              className="search__input"
              type="text"
              placeholder="Search post..."
              onChange={handleSearchTitle}
            />
          </div>
          {!userAuth ? (
            <Link className="navLink" to="/login">
              Login
            </Link>
          ) : (
            <LoginUserProfile
              setIsAuth={setIsAuth}
              isAuth={isAuth}
              signOutGoogle={signOutGoogle}
            />
          )}
        </div>
      </nav>
    </div>
  );
}

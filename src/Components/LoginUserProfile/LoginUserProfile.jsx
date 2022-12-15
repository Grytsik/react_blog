import { useState, useEffect, useRef } from "react";
import { auth } from "../../firebase/firebase-config";
import Dropdown from "../Dropdown/Dropdown";
import arrow from "../../img/arrow.png";
import userlogo from "../../img/no-avatar.jpeg";
import "../LoginUserProfile/LoginUserProfile.scss";

export default function LoginUserProfile({ signOutGoogle }) {
  const [profile, setProfile] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const unsunbcribe = auth.onAuthStateChanged((user) => {
      if (user !== null) {
        const authUserData = {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName || auth.currentUser.email,
          img: auth.currentUser.photoURL,
        };
        setProfile(authUserData);
      }
    });
    return () => {
      unsunbcribe();
    };
  }, []);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setActiveDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropDownHandler = () => {
    setActiveDropdown((active) => !active);
  };

  return (
    <>
      {profile && (
        <div className="loginProfile" key={profile.id}>
          {profile.img ? (
            <img
              className="userLoginPhoto"
              src={profile.img}
              alt={profile.name}
            />
          ) : (
            <img className="photoNoName" src={userlogo} alt="anon" />
          )}
          <div className="userLogOut-email">
            <p className="userLoginEmail">{profile.name}</p>
            <button onClick={dropDownHandler}>
              <img
                className={`dropdown__btn ${activeDropdown ? "active" : ""}`}
                src={arrow}
                alt="arrow"
              />
            </button>
          </div>
          <Dropdown
            setActiveDropdown={setActiveDropdown}
            signOutGoogle={signOutGoogle}
            activeDropdown={activeDropdown}
          />
        </div>
      )}
    </>
  );
}

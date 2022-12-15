import { useState } from "react";
import { Link } from "react-router-dom";
import notPostLogo from "../../img/404.png";
import "./NotFoundPage.scss";

export default function NotFoundPage({ props, classBtn }) {
  const [classNameBtn] = useState(classBtn);

  return (
    <div className="notFound">
      <div className="notFoundBlock">
        <p className="notFoundtext">Ooops, {props} not found...</p>
        <img className="notFoundImage" src={notPostLogo} alt=":(" />
      </div>
      <div className="toHomeLink">
        <Link to="/">
          <button className={`${classNameBtn ? "toHomeLinkBtn" : "hideBtn"}`}>
            Back to home
          </button>
        </Link>
      </div>
    </div>
  );
}

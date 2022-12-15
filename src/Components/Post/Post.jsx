import UserPhotos from "../UserPhotos/UserPhotos";
import AnonimUser from "../AnonimUser/AnonimUser";
import Moment from "react-moment";
import "./Post.scss";

export default function Post({ props, children, postClass, imgClass }) {
  return (
    <div key={props.id} className="post">
      <div className={postClass}>
        <div className="userProfile">
          <div className="userProfile__photo">
            {props.author.img ? (
              <UserPhotos props={props} className={"userPhoto"} />
            ) : (
              <AnonimUser className={"userPhoto"} />
            )}
            <div className="userProfile__name">
              <p className="userEmail">{props.author.name}</p>
              <Moment className="userTime" format="dd HH:mm">
                {props.author.date}
              </Moment>
            </div>
          </div>
          <img className={imgClass} src={props.img} alt="Post" />
        </div>
        {children}
      </div>
    </div>
  );
}

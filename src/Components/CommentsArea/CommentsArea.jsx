import { auth } from "../../firebase/firebase-config";
import userlogo from "../../img/no-avatar.jpeg";
import "../AddComments/AddComments.scss";

export default function CommentsArea({
  setCommentsList,
  commentsList,
  children,
}) {
  return (
    <div className="comments">
      <div className="comments__container">
        <div className="comments__profile">
          <img
            className="comments__photo"
            src={auth.currentUser.photoURL || userlogo}
            alt={auth.currentUser.displayName || auth.currentUser.email}
          />
          <h3 className="comments__name">
            {auth.currentUser.displayName || auth.currentUser.email}
          </h3>
        </div>
        <textarea
          onChange={(e) => setCommentsList(e.target.value)}
          value={commentsList}
          placeholder="Your comment"
          className="comments__text"
        ></textarea>
        {children}
      </div>
    </div>
  );
}

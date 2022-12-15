import { auth, db } from "../../firebase/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import UserPhotos from "../UserPhotos/UserPhotos";
import AnonimUser from "../AnonimUser/AnonimUser";
import Moment from "react-moment";
import "./UserComments.scss";
import { useContext } from "react";
import { PostContext } from "../../App";

export default function UserComments({ paramsId }) {
  const { comments, setComments } = useContext(PostContext);

  const deleteComment = async (id) => {
    const commentDoc = doc(db, "comments", id);
    await deleteDoc(commentDoc);

    let delComm = [...comments].filter((item) => item.id !== id);
    setComments(delComm);
  };

  console.log(comments);
  return (
    <>
      {comments.map((item) =>
        item.postId !== paramsId ? null : (
          <div key={item.id} className="userComments">
            <div className="userComments__container">
              <div className="userComments__profile">
                {item.author.img ? (
                  <UserPhotos props={item} className={"userComments__photo"} />
                ) : (
                  <AnonimUser className={"userComments__photo"} />
                )}
                <h3>{item.author.name}</h3>
                <Moment format="dd HH:mm">{item.author.date}</Moment>
                <p className="userComments__comment">{item.comment}</p>
              </div>
              {auth.currentUser && item.author.id === auth.currentUser.uid && (
                <>
                  <button
                    onClick={() => deleteComment(item.id)}
                    className="deleteBtn"
                  >
                    &#128465;
                  </button>
                </>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
}

import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Post from "../Post/Post";
import CommentsArea from "../CommentsArea/CommentsArea";
import UserComments from "../UserComments.jsx/UserComments";
import "./AddComments.scss";
import { PostContext } from "../../App";

export default function AddComments() {
  const [commentsList, setCommentsList] = useState("");
  const commentsCollectionRef = collection(db, "comments");
  const { id } = useParams();
  const { postList, getComments } = useContext(PostContext);

  const createComments = async () => {
    if (commentsList) {
      await addDoc(commentsCollectionRef, {
        comment: commentsList,
        postId: id,
        author: {
          name: auth.currentUser.displayName || auth.currentUser.email,
          id: auth.currentUser.uid,
          img: auth.currentUser.photoURL,
          date: Date.now(),
        },
      });
    }
    setCommentsList("");
  };

  useEffect(() => {
    getComments();
  }, [commentsList]);

  return (
    <>
      {postList.map((item) =>
        item.id !== id ? null : (
          <div key={item.id}>
            <Post props={item} postClass="userPost" imgClass="userPost__image">
              <h2 className="userTitle">{item.postTitle}</h2>
              <p>{item.postText}</p>
            </Post>
            <CommentsArea
              commentsList={commentsList}
              setCommentsList={setCommentsList}
            >
              <button onClick={createComments} className="comments__btn">
                Add
              </button>
            </CommentsArea>
            <UserComments paramsId={id} />
          </div>
        )
      )}
    </>
  );
}

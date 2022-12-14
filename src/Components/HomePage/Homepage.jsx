import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import commentsLogo from "../../img/comments.png";
import chat from "../../img/chat.png";
import Post from "../Post/Post";
import EditBlock from "../EditBlock/EditBlock";
import "../HomePage/HomePage.scss";
import Slick from "../Slider/Slick";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ReactPaginate from "react-paginate";
import { PostContext } from "../../App";

export default function Homepage() {
  const [edit, setEdit] = useState(null);
  const [valueEdit, setValueEdit] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const {
    postList,
    setPostList,
    filteredPost,
    getPosted,
    getComments,
    comments,
  } = useContext(PostContext);
  const myRef = useRef();

  const itemsPerPage = 4;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredPost.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredPost.length / itemsPerPage);

  useEffect(() => {
    getPosted();
    getComments();
  }, []);

  // Функция для пагинации
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredPost.length;
    window.scrollTo({ behavior: "smooth", top: myRef.current.offsetTop });
    setItemOffset(newOffset);
  };

  // Функция подсчета комментов под постом
  function getCountComments(id) {
    const commentsCount = comments.filter((item) => item.postId === id);
    return commentsCount.length;
  }

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);

    let removePost = [...postList].filter((item) => item.id !== id);
    setPostList(removePost);
  };

  const editPost = (id, text, title) => {
    setEdit(id);
    setValueEdit(text);
    setEditTitle(title);
  };

  const saveEditValue = (id, img) => {
    const postEdit = doc(db, "posts", id);
    let newPost = [...postList].filter((item) => {
      if (item.id === id && valueEdit && editTitle) {
        item.postText = valueEdit;
        item.postTitle = editTitle;

        setDoc(postEdit, {
          postTitle: editTitle,
          postText: valueEdit,
          img,
          author: {
            name: auth.currentUser.displayName || auth.currentUser.email,
            id: auth.currentUser.uid,
            img: auth.currentUser.photoURL,
            date: Date.now(),
          },
        });
      }
      return item;
    });
    setPostList(newPost);
    setEdit(null);
  };

  return (
    <div className="homePage" ref={myRef}>
      <Slick />
      <div className="container homePage__container">
        {currentItems.length === 0 ? (
          <NotFoundPage classBtn={false} props={"post"} />
        ) : (
          currentItems.map((item) => (
            <div key={item.id}>
              {edit === item.id ? (
                <Post props={item} postClass="userPost" imgClass="postImage">
                  <EditBlock
                    editTitle={editTitle}
                    setEditTitle={setEditTitle}
                    valueEdit={valueEdit}
                    setValueEdit={setValueEdit}
                  >
                    <button
                      className="editBtn"
                      onClick={() => saveEditValue(item.id, item.img)}
                    >
                      Save
                    </button>
                  </EditBlock>
                </Post>
              ) : (
                <Post props={item} postClass="postUser" imgClass="postImage">
                  <div className="userInfo">
                    <h2 className="userTitle">{item.postTitle}</h2>
                    <p className="userText">{item.postText}</p>
                  </div>
                  <div className="btn__group">
                    <h3 className="chatLogo__btn">
                      <img className="chat__btn" src={chat} alt="chat" />
                      {getCountComments(item.id)}
                    </h3>
                    {!auth.currentUser ? null : (
                      <Link to={`/comments/${item.id}`}>
                        <button>
                          <img
                            className="commentLogo__btn"
                            src={commentsLogo}
                            alt="comments"
                          />
                        </button>
                      </Link>
                    )}
                  </div>
                  {auth.currentUser &&
                    item.author.id === auth.currentUser.uid && (
                      <>
                        <button
                          className="deleteBtn"
                          onClick={() => deletePost(item.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="editLogo__btn"
                          onClick={() =>
                            editPost(item.id, item.postText, item.postTitle)
                          }
                        >
                          Edit
                        </button>
                      </>
                    )}
                </Post>
              )}
            </div>
          ))
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active-page"
        disabledClassName="disabled-page"
      />
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Post from "../Post/Post";
import CommentsArea from "../CommentsArea/CommentsArea";
import UserComments from "../UserComments.jsx/UserComments";
import './AddComments.scss';

export default function AddComments () {
	const [commentsList, setCommentsList] = useState('');
	const [commentsUser, setCommentsUser] = useState([]);
	const [post, setPost] = useState([]);
	const commentsCollectionRef = collection(db, 'comments');
	const postsCollectionRef = collection(db, 'posts');
	const {id} = useParams();

	const createComments = async () => {
		if(commentsList) {
			await addDoc(commentsCollectionRef, {
				comment: commentsList,
				postId: id,
				author : {
					name: auth.currentUser.displayName || auth.currentUser.email,
					id: auth.currentUser.uid,
					img: auth.currentUser.photoURL,
					date: Date.now(),
				}
			});
		};
		setCommentsList('');
	};

	useEffect(() => {
		const getComments = async () => {
			const userData = await getDocs(commentsCollectionRef);
			setCommentsUser(userData.docs.map(doc => ({...doc.data(), id: doc.id})));
		};
		getComments();
	}, [commentsList]);

	useEffect( () => {
		const getPosts = async () => {
			const postData = await getDocs(postsCollectionRef);
			setPost(postData.docs.map(doc => ({...doc.data(), id: doc.id})));
		};
		getPosts();
	}, []);

	return (
		<>
		{post.map(item => (
			item.id !== id ?
				null :
				<div key={item.id}>
					<Post
						props={item}
						cname='userPost'
						imgClass='userPost__image'>
						<h2 className="userTitle">{item.postTitle}</h2>
						<p>{item.postText}</p>
					</Post>
					<CommentsArea
						commentsList={commentsList}
						setCommentsList={setCommentsList}>
						<button
							onClick={createComments}
							className="comments__btn">Add
						</button>
					</CommentsArea>
					<UserComments
						setCommentsUser={setCommentsUser}
						paramsId={id}
						commentsUser={commentsUser}
					/>
				</div>
			))
		}
		</>
	)
}
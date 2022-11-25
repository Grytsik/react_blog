import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, auth, storage } from "../../firebase/firebase-config";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import './CreatePost.scss';

export default function CreatePost({myRef, scrollRef}) {
	const [postTitle, setPostTitle] = useState('');
	const [postText, setPostText] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [disabledBtn, setDisabledBtn] = useState(true);
	const [images, setImages] = useState('');
	const [progress, setProgress] = useState(0);
	const navigate = useNavigate();
	const postsCollectionRef = collection(db, 'posts');

	setTimeout(scrollRef, 500);

	const createPost = async () => {
		 if(postText && postTitle ) {
				await addDoc(postsCollectionRef, {
					postTitle,
					postText,
					img: images,
					author : {
						name: auth.currentUser.displayName || auth.currentUser.email,
						id: auth.currentUser.uid,
						img: auth.currentUser.photoURL,
						date: Date.now(),
					}
				});
			navigate('/');
		} else {
			setErrorMessage('Not value in your post...')
		}
	};

	const formHandler = async (e) => {
		e.preventDefault();
		const file = e.target[0].files[0];
		uploadFiles(file);
	}

	const uploadFiles = (file) => {
		if(!file) return;
		const storageRef = ref(storage, `${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on('state_changed', (snapshot) => {
			let prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
			setProgress(prog);

			getDownloadURL(storageRef).then(url => {
				setImages(url);
				setDisabledBtn(false);
			});
		});
	}

	return (
		<div className="createPostPage">
			<div className="createPost__container" ref={myRef}>
				<h1>CREATE A POST</h1>
					<div className="block__create">
						<input
							id="title"
							type="text"
							placeholder="Your title..."
							onChange={(e) => setPostTitle(e.target.value)}
							value={postTitle}
						/>
						<form onSubmit={formHandler}>
							<input className="createPost__file" type="file" />
							<div className="createPost__upload">
								<h3 className="createPost__progress">Upload : {progress}% </h3>
								<button className="uploadBtn" type="submit">upload</button>
							</div>
						</form>
					</div>
					<div className="block__create">
						<textarea
							resize='none'
							className="create__area"
							id="text"
							placeholder="Your text..."
							onChange={(e) => setPostText(e.target.value)}
							value={postText}
						/>
						<button
							disabled={disabledBtn}
							className="postBtn"
							onClick={createPost}>Add
						</button>
					</div>
				{errorMessage && (
					<ErrorMessage errorMessage={errorMessage}/>
				)}
			</div>
		</div>
	)
}
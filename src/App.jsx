import {Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { signOut } from 'firebase/auth'
import { auth, db} from '../src/firebase/firebase-config';
import { collection, getDocs} from "firebase/firestore";
import Nav from './Components/Nav/Nav';
import Homepage from './Components/HomePage/Homepage';
import AddComments from './Components/AddComments/AddComments';
import CreatePost from './Components/CreatePost/CreatePost';
import Login from './Components/Login/Login';
import ProfileUser from './Components/ProfileUser/ProfileUser';
import Footer from './Components/Footer/Footer';
import Loader from './Components/Loader/Loader';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';
import './App.scss';

export default function App() {
	const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
	const [loaderActive, setLoaderActive] = useState(null);
	const [postList, setPostList] = useState([]);
	const [search, setSearch] = useState('');
	const postsCollectionRef = collection(db, 'posts');
	const navigate = useNavigate();
	const myRef = useRef(null);

	useEffect(() => {
		const getPosted = async () => {
			const data = await getDocs(postsCollectionRef);
			setPostList(data.docs.map(doc => ({...doc.data(), id: doc.id})));
		}
		getPosted();

		setTimeout(() => {
			setLoaderActive(true);
		},1000)
	}, []);

	const scrollRef = () => {
		myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	const filteredPost = postList.filter(item => {
		return item.postTitle.toLowerCase().includes(search.toLowerCase());
	});

	const signOutGoogle = async () => {
		await signOut(auth)
			.then(() => {
				localStorage.clear();
				setIsAuth(true);
				navigate('/login');
				scrollRef();
			});
	};

	const handleSearchTitle = (post) => {
		setSearch(post);
	}

	return(
		<>
			{!loaderActive ?
				<Loader/> :
				<div>
					<Nav
					isAuth={isAuth}
					signOutGoogle={signOutGoogle}
					setIsAuth={setIsAuth}
					searchPost={handleSearchTitle}
					/>
					<div>
						<Routes>
							<Route path='/' element={<Homepage filteredPost={filteredPost} postList={postList} setPostList={setPostList}/>}/>
							<Route path='/comments/:id' element={<AddComments/>}/>
							<Route path='/createpost' element={<CreatePost isAuth={isAuth} myRef={myRef} scrollRef={scrollRef}/>}/>
							<Route path='/login' element={<Login setIsAuth={setIsAuth}/>}/>
							<Route path='/profile' element={<ProfileUser/>}/>
							<Route path='*' element={<NotFoundPage classBtn={true} props={'page'}/>}/>
						</Routes>
					</div>
					<Footer/>
				</div>
			}
		</>
	)
}
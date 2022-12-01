import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase-config';
import userlogo from '../../img/no-avatar.jpeg';
import '../ProfileUser/ProfileUser.css';

export default function ProfileUser() {
	const [userProfile, setUserProfile] = useState([]);

	useEffect(() => {
		const getUserProfile = auth.onAuthStateChanged(user => {
		 if(user !== null) {
			 const authUserData = {
				 id: auth.currentUser.uid,
				 name: auth.currentUser.displayName || auth.currentUser.email,
				 img: auth.currentUser.photoURL,
				 created: auth.currentUser.metadata.creationTime,
				 lastSignIn: auth.currentUser.metadata.lastSignInTime,
			 };
			 setUserProfile(authUserData);
		 };
	 });
	 return getUserProfile();
 }, []);

	return (
		<>
			{userProfile && (
				<div className="profileUser">
					{userProfile.img ?
						<img
							className="profileUser__photo"
							src={userProfile.img}
							alt={userProfile.name}
						/> :
						<img
							className="profileUser__noPhoto"
							src={userlogo}
							alt="anon"
						/>
					}
					<div className="profileUser__name-email">
						<h3 className='profileUser__name'>{userProfile.name}</h3>
						<p>
							<span className='profile__span'>Created</span>: {userProfile.created}
						</p>
						<p>
							<span className='profile__span'>Last sign in</span>: {userProfile.lastSignIn}
						</p>
					</div>
				</div>
			)}
		</>
	)
}
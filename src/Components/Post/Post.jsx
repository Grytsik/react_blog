import UserPhotos from "../UserPhotos/UserPhotos";
import AnonimUser from "../AnonimUser/AnonimUser";
import Moment from "react-moment";
import './Post.scss'

export default function Post({props, children}) {


	return (
		<div key={props.id} className="post">
			<div className='userPost'>
				<div className="userProfile">
					<div className="userProfile__email-lDate">
						{props.author.img ?
						<UserPhotos props={props} className={"userPhoto"}/> :
						<AnonimUser className={"userPhoto"}/>
						}
						<p className="userEmail">{props.author.name}</p>
						<Moment className="userTime" format="dd HH:mm">{props.author.date}</Moment>
						<div>
							<img className="userPost__image" src={props.img} alt="" />
						</div>
					</div>
				</div>
				{children}
			</div>
		</div>
	)
}
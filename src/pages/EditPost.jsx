import { useParams, Link } from "react-router-dom"

export default function EditPost() {
	const {id} = useParams();
	
	return (
		<div>
			<p>Edit post {id}</p>
			<Link to={'/posts'}>All posts</Link>
		</div>
	)
}
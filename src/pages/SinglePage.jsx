import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

export default function SinglePage() {
	const {id} = useParams();
	const [post, setPost] = useState(null);
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	}

	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
			.then(response => response.json())
			.then(dataJson => setPost(dataJson));
	}, [id])
	console.log(post);

	return (
		<div>
			{post && (
				<>
					<h1>{post.title}</h1>
					<p>{post.title}</p>
					<Link to={`/posts/${id}/edit`}>Edit post</Link>
				</>
			)}
			<button onClick={goBack}>Back</button>
		</div>
	)
}
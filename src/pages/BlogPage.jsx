import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function BlogPage() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then(res => res.json())
			.then(data => setPosts(data));
	}, []);

	return (
		<div>
			<p>Blog page</p>

		{
			posts.map(item => (
				<Link key={item.id} to={`/posts/${item.id}`}>
					<li>{item.title}</li>
				</Link>
			))
		}		
		</div>
	)
}
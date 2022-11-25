import {blogLike} from '../../redux/action.js';
import { useDispatch, useSelector } from 'react-redux';
import './Like.css'

export default function Like() {
	const dispatch = useDispatch();

	const likeSelector = useSelector(state => {
		const {likeReducer} = state;
		return {
			likes: likeReducer.likes,
		}
	});

	const handleClick = () => {
		dispatch(blogLike());
	};

	return (
		<div>
			<button className='likeBtn' onClick={() => handleClick()}>
				Like &#9825;{likeSelector.likes}
			</button>
		</div>
	)
}
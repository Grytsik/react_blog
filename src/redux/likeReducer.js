import { BLOG_LIKE, GET_POSTS } from "./type";

const initialState = {
	likes: 0,
}

export const likeReducer = (state = initialState, action) => {
	switch(action.type) {
		case BLOG_LIKE :
			return {
				...state,
				likes: state.likes + 1,
			}
			
			default:
				return state;
	}
}
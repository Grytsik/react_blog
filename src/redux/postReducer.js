import { GET_POSTS, REMOVE_POST } from "./type";

const initialState = {
	data: [],
};

export const postReducer = (state = initialState, action) => {
	console.log(...state.data);
	switch(action.type) {
		case GET_POSTS:
		return {
			...state, data:[...state.data, ...action.payload]
		}
		case REMOVE_POST: {
			// return {
			// 	...state.filter(el => el.id !== action.payload.id)
			// }
			return {
				...state.data.filter(item => item.id !== action.id)
			// 	// ...state.data.filter(item => item.id !== action.payload.id)
			}
		}
		default:
			return state;
	}
}
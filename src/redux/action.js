import { BLOG_LIKE, GET_POSTS, REMOVE_POST } from "./type";

export function blogLike() {
	return {
		type: BLOG_LIKE
	}
}

export function getPost(payload) {
	return {
		type: GET_POSTS,
		payload,
	}
}

export function removePost(id) {
	return {
		type: REMOVE_POST,
		payload: id,
	}
}


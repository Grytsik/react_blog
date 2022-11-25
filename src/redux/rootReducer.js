import { combineReducers } from "redux";
import { likeReducer } from "./likeReducer";
import { postReducer } from './postReducer'


export const rootReducer = combineReducers({
	likeReducer,
	postReducer,
});
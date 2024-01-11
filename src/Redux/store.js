import { combineReducers, createStore, applyMiddleware } from "redux";
import { imageReducer } from "./Reducer/reducer";
import { loginSignupReducer } from "./Reducer/authReducer";
import { thunk } from "redux-thunk";
import { feedBackReducer } from "./Reducer/feedbackReducer";

const Reducer = combineReducers({
    imageReducer: imageReducer,
    loginSignupReducer: loginSignupReducer,
    feedBackReducer: feedBackReducer,
})

export const store = createStore(Reducer, applyMiddleware(thunk))
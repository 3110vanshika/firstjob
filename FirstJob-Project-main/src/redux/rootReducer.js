import { combineReducers } from "redux";
import userReducer from "./authentication/reducer";

const rootReducer = combineReducers({
    userReducer,
});

export default rootReducer;
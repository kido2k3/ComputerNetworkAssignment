import { combineReducers } from "redux";
import LoadingReducer from "./LoadingReducer";
import AuthReducer from "./AuthReducer";
const rootReducer = combineReducers({
  LoadingReducer: LoadingReducer,
  AuthReducer: AuthReducer,
});
export default rootReducer;

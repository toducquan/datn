import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Settings from "./Settings";
import Common from "./Common";
import NotificationReducer from "./notification";
import SemesterReducer from "./Semester";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    common: Common,
    notification: NotificationReducer,
    semester: SemesterReducer,
  });

export default createRootReducer;

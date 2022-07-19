import { all } from "redux-saga/effects";
import notificationSagas from "./notificationSaga";

export default function* rootSaga() {
  yield all([
    ...notificationSagas,
  ]);
}

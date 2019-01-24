import {all} from 'redux-saga/effects';
import commentLists from "./commentsSaga";

export default function* rootSaga() {
    yield all([
        commentLists()
    ])
  }
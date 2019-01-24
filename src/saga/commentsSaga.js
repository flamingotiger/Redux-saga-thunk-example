import { call, put, takeLatest } from 'redux-saga/effects'
import { CommentsApi } from '../api';
import { commentsListSuccess, commentsListFailure, commentsListRequest } from '../reducers/commentsReducers';

//saga
function* commentsListApi(action) {
    try {
        const comments = yield call(CommentsApi.list);
        yield put(commentsListSuccess(comments));
    } catch (e) {
        yield put(commentsListFailure(e.massage));
    }
}
export default function* commentLists() {
    yield takeLatest(commentsListRequest, commentsListApi);
}

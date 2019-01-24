import {createAction, handleActions} from 'redux-actions';

const prefix = 'COMMENTS';

const commentsListRequest = createAction(`${prefix}_LIST_REQUEST`);
const commentsListSuccess = createAction(`${prefix}_LIST_SUCCESS`, comments => ({comments}));
const commentsListFailure = createAction(`${prefix}_LIST_FAILURE`, err => err);

export {
    commentsListRequest,
    commentsListSuccess,
    commentsListFailure
};

const immutable = {
    comments:[],
    isLoading:false,
    err:null
}
export default handleActions({
    [commentsListRequest]:(state, payload) => {
        return {...state, isLoading:true}
    },
    [commentsListSuccess]:(state, {payload}) => {
        return {...state, comments:payload.comments, isLoading:false}
    },
    [commentsListFailure]:(state, {payload}) => {
        return {...state, err:payload.err}
    }
},{
    ...immutable
})
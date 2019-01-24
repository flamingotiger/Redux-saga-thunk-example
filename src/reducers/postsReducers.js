import {createAction, handleActions} from 'redux-actions';
import {PostsApi} from '../api';
const prefix = 'POSTS';

const postsListRequest = createAction(`${prefix}_POST_LIST_REQUEST`);
const postsListSuccess = createAction(`${prefix}_POST_LIST_SUCCESS`, posts => ({posts}));
const postsListFailure = createAction(`${prefix}_POST_LIST_FAILURE`, err => err);

export const listPosts = () => {
    return dispatch => {
      dispatch(postsListRequest());
      PostsApi.list().then((posts) => {
          dispatch(postsListSuccess(posts));
        })
        .catch(err => {
          dispatch(postsListFailure(err));
        });
    };
  };
const immutable = {
    posts:[],
    isLoading:false,
    err:null
}
export default handleActions({
    [postsListRequest]:(state, payload) => {
        return {...state, isLoading:true}
    },
    [postsListSuccess]:(state, {payload}) => {
        return {...state, posts:payload.posts, isLoading:false}
    },
    [postsListFailure]:(state, {payload}) => {
        return {...state, err:payload.err}
    }
},{
    ...immutable
})
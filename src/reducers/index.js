import {combineReducers} from 'redux';
import postsReducers from './postsReducers';
import commentsReducers from './commentsReducers';

export default combineReducers({
    posts:postsReducers,
    comments:commentsReducers
})
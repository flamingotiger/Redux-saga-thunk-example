import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as postActions from './reducers/postsReducers';
import * as commentsActions from './reducers/commentsReducers';

class App extends Component {
  componentDidMount() {
    //thunk
    this.props.onListPosts();
    //saga
    this.props.onCommentsList();
  }
  render() {
    if (this.props.posts.isLoading) {
      return <div>loading......</div>
    }
    return (
      <div className="App">
        {this.props.posts.posts.map((post, i) =>
          <div key={i}>{post.title}</div>)}
          
        {this.props.comments.isLoading ?
          (<div>Loading....</div>) :
          (this.props.comments.comments.map((comment, i) =>
            <div key={i}>
              comments {comment.body}
            </div>))
        }
      </div>
    );
  }
}
const mapStateToProps = ({ posts, comments }) => ({ posts, comments })

const mapDispatchToProps = dispatch => {
  return {
    onListPosts: () => {
      dispatch(postActions.listPosts());
    },
    onCommentsList: () => {
      dispatch(commentsActions.commentsListRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

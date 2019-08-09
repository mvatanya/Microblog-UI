import { ADD_POST, REMOVE_POST, ADD_COMMENT, EDIT_POST, GET_POSTS, GET_COMMENTS, GET_POST } from "./actionTypes";
import axios from 'axios'

export function addPost(newData) {
  return {
    type: ADD_POST,
    newData
  }
}

export function removePost(id) {
  return {
    type: REMOVE_POST,
    id
  }
}

export function addComment(newComment) {
  return {
    type: ADD_COMMENT,
    newComment
  }
}

export function editPost(newData) {
  return {
    type: EDIT_POST,
    newData
  }
}

export function getPostsFromAPI() {
  return async function(dispatch) {
    let res = await axios.get(`http://localhost:5000/api/posts`);
    console.log("response from getPostsFromAPI:",res)
    dispatch(getPosts(res.data));
  };
}

export function getPosts(data) {
  return {
    type: GET_POSTS,
    data
  }
}

export function getPostFromAPI(post_id) {
  return async function(dispatch) {
    let res = await axios.get(`http://localhost:5000/api/posts/${post_id}`);
    console.log("response from getPostsFromAPI:",res)
    dispatch(getPost(res.data));
  };
}

export function getPost(data) {
  return {
    type: GET_POST,
    data
  }
}


export function getCommentsFromAPI(post_id) {
  return async function(dispatch) {
    let res = await axios.get(`http://localhost:5000/api/posts/${post_id}/comments`);
    dispatch(getComments(res.data,post_id));
  };
}

export function getComments(data, post_id) {
  return {
    type: GET_COMMENTS,
    data, 
    post_id
  }
}
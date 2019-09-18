import {
  REMOVE_POST,
  ADD_COMMENT,
  EDIT_POST,
  GET_POSTS,
  GET_COMMENTS,
  GET_POST,
  POST_POST,
  VOTE
} from "./actionTypes";
import axios from 'axios'


export function getPostsFromAPI() {
  return async function (dispatch) {
    let res = await axios.get(`http://localhost:5000/api/posts`);
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
  return async function (dispatch) {
    let res = await axios.get(`http://localhost:5000/api/posts/${post_id}`);
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
  return async function (dispatch) {
    let res = await axios.get(`http://localhost:5000/api/posts/${post_id}/comments`);
    dispatch(getComments(res.data, post_id));
  };
}

export function getComments(data, post_id) {
  return {
    type: GET_COMMENTS,
    data,
    post_id
  }
}


export function postPostToAPI(newData) {
  let body = {
    "title": newData.title,
    "description": newData.description,
    "body": newData.body
  }
  return async function (dispatch) {
    let res = await axios.post(`http://localhost:5000/api/posts`, body);
    dispatch(postPost(res.data));
  };
}

export function postPost(newData) {
  return {
    type: POST_POST,
    newData
  }
}


export function removePostFromAPI(post_id) {
  return async function (dispatch) {
    await axios.delete(`http://localhost:5000/api/posts/${post_id}`);
    dispatch(removePost(post_id));
  };
}


export function removePost(id) {
  return {
    type: REMOVE_POST,
    id
  }
}

export function addCommentToAPI(newComment) {
  return async function (dispatch) {
    let body = { "text": newComment.text }
    let res = await axios.post(`http://localhost:5000/api/posts/${newComment.postId}/comments`, body);
    dispatch(addComment(res.data, newComment.postId));
  };
}

export function addComment(newComment, postId) {
  return {
    type: ADD_COMMENT,
    newComment,
    postId
  }
}

export function editPostToAPI(newData) {
  let body = {
    "title": newData.title,
    "description": newData.description,
    "body": newData.body,
    "votes":newData.votes
  }
  return async function (dispatch) {
    let res = await axios.put(`http://localhost:5000/api/posts/${newData.id}`, body);
    dispatch(postPost(res.data));
  };
}

export function editPost(newData) {
  return {
    type: EDIT_POST,
    newData
  }
}

export function sendVoteToAPI(id, direction="up") {
  return async function (dispatch) {
    const response = await axios.post(`http://localhost:5000/api/posts/${id}/vote/${direction}`);
    return dispatch(vote(id, response.data.votes));
  };
}

function vote(id, votes) {
  return {
    type: VOTE,
    id,
    votes
  };
}
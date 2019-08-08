import { ADD_POST, REMOVE_POST, ADD_COMMENT, EDIT_POST } from "./actionTypes";

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

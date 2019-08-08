import { ADD_POST, REMOVE_POST, ADD_COMMENT, EDIT_POST } from "./actionTypes";


const DEFAULT_STATE = {
  posts: { },
  comments:{ }
};

function rootReducer(state = DEFAULT_STATE, action) {
  if (action.type === ADD_POST) {
  // console.log("root newData", action.newData)
    return {
      ...state,
      posts: {
        ...state.posts,
        [action.newData.id]: {postTitle: action.newData.postTitle, 
                              title: action.newData.title, 
                              description: action.newData.description, 
                              body: action.newData.body} 
      }
    }
  };
  
  if (action.type === REMOVE_POST) {
      let id = action.id
      let copyposts = {...state.posts}
      delete copyposts[id]
      return {
        ...state,
        posts: copyposts
      }
  }
  if (action.type === EDIT_POST) {
    let id = action.newData.id
    console.log("id", id)
    console.log("action.newData",action.newData )
    return {
      ...state,
      posts: {
        ...state.posts,
        [id]: {postTitle: action.newData.postTitle, 
                title: action.newData.title, 
                description: action.newData.description, 
                body: action.newData.body} 
      }
    }
}

  if (action.type === ADD_COMMENT) {
    console.log("comment id", action.newComment.id)
    console.log("action.newComment", action.newComment)
    return {
      ...state,
      comments: {
        ...state.comments,
        [action.newComment.id]: {comment: action.newComment.comment, postId: action.newComment.postId} 
      }
    }
  }
  return state;
}

export default rootReducer;

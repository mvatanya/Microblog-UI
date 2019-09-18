import {  REMOVE_POST, 
          ADD_COMMENT, 
          EDIT_POST, 
          GET_POSTS, 
          GET_COMMENTS, 
          GET_POST,
          POST_POST,
          VOTE
        } from "./actionTypes";

const DEFAULT_STATE = {
  posts: {},
  comments:{},
  titles:[]
};

function rootReducer(state = DEFAULT_STATE, action) {
  
  
  if (action.type === REMOVE_POST) {
      let id = action.id
      let copyposts = {...state.posts}
      let copyTitles = {...state.titles}
      delete copyposts[id]
      delete copyTitles[id]
      
      return {
        ...state,
        posts: copyposts,
        titles: copyTitles
      }
  }

  if (action.type === EDIT_POST) {
    let id = action.newData.id
    return {
      ...state,
      posts: {
        ...state.posts,
        [id]: { title: action.newData.title, 
                description: action.newData.description, 
                body: action.newData.body} 
      },
      titles: {
        ...state.titles,
        [id]: {title: action.newData.title, 
              description: action.newData.description}
      }
    }
  }

  if (action.type === ADD_COMMENT) {
    const {id, text} = action.newComment
    return {
      ...state,
      comments: {
        ...state.comments,
        [id]:{
          text,
          postId:action.postId,
          id
        } 
      }
    }
  }

  if (action.type === GET_POSTS) {

    let listOfPosts = action.data
    let newPosts = {...state.posts}
    for (let post of listOfPosts){
      const {id, title, description, votes} = post
      newPosts[id]= {title, description, votes}
    }
    let newTitles = {...state.titles}
    for (let title_ of listOfPosts){
      const {id, title, description} = title_
      newTitles[id] = {title, description}
    }
    
    return {
      ...state,
      posts: newPosts,
      titles: newTitles 
    }
  }

  if (action.type === GET_POST) {

    let {id, title, description, body, votes} = action.data
    let newPosts = {...state.posts}
    newPosts[id] = {title, description, body, votes }

    return {
      ...state,
      posts: newPosts
    }
  }

  if (action.type === GET_COMMENTS) {

    let listOfComments = action.data
    let newComments = {...state.comments}
    let postId = action.post_id
    for (let comment of listOfComments){
      const {id, text} = comment
      newComments[id]= {text: text, postId: postId}
    }
   

    return {
      ...state,
      comments: newComments
    }
  }

  if (action.type === POST_POST) {
    let id = action.newData.id
    return {
      ...state,
      posts: {
        ...state.posts,
        [id]: { title: action.newData.title, 
                description: action.newData.description, 
                body: action.newData.body,
                votes: action.newData.votes} 
      },
      titles: {
        ...state.titles,
        [id]: {title: action.newData.title, 
              description: action.newData.description}
      }
    }
  }

  if(action.type === VOTE) {
    let id = action.id
    return {
      ...state,
      posts: {
        ...state.posts,
        [id]: { ...state.posts[id], votes: action.votes } 
      }
    }
  }
  


  return state
}

export default rootReducer;

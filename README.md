# Microblog

This is a blogging app built with React and Redux. 

Backend code is provided by Rithm School. 

### Key learnings;

  * Using redux-thunk for asychronous actions that both deal with AJAX calls and then dispatch ordinary actions with the data returned.
  * Redux helps solves the issue of prop-drilling and helps managing large applications
  * The benefits of normalizing state shape (to simplify reducer logic, prevent unnecessary re-renders, and improve performance)

### App Information
#### Component Hierarchy

```
  App
  ├─┬ components/Home
  │ └── containers/TitleList
  ├─┬ containers/NewPost
  │ └── components/PostForm
  └─┬ containers/Post
    ├── components/CommentForm
    ├── components/CommentList
    ├── components/PostDisplay
    └── components/PostForm
```

### Getting Started
1. Clone this repo
2. cd into the "backend" directory, install required packages, create and seed database, and start the server
```
  cd backend
  npm install
  createdb microblog
  psql microblog < data.sql
  nodemon server.js 

```
3. cd into the "frontend" directory, install required packages, then start the app

```
  cd frontend
  npm install
  npm start
```

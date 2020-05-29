# Microblog

This is a blogging app built with React and Redux. 

Backend code is in Microblog-API repo

### Key learnings;

  * Using redux-thunk for asychronous actions that both deal with AJAX calls and then dispatch ordinary actions with the data returned.
  * Redux helps solves the issue of prop-drilling and helps managing large applications
  * The benefits of normalizing state shape (to simplify reducer logic, prevent unnecessary re-renders, and improve performance)

### App Information
#### Component Hierarchy

```
  App
  ├── /Home
  ├── /NewPostForm
  └─┬ /PostDetail
    ├── /CommentForm
    ├── /CommentList
    └── /EditPostForm
```

### Getting Started
1. Clone Microblog-API repo then cd into the directory, install required packages, create and seed database, and start the server
```
  cd Microblog-API
  npm install
  createdb microblog
  psql microblog < data.sql
  nodemon server.js 

```
2. Clone this repo
3. cd into this directory, install required packages, then start the app

```
  cd Microblog-UI
  npm install
  npm start
```

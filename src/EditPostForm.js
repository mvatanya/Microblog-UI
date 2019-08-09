import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux"
import Alert from "./Alert";
import { editPost } from "./actions"

class EditPostForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title:this.props.posts[this.props.id].title,
      description:this.props.posts[this.props.id].description,
      body:this.props.posts[this.props.id].body,
      errors:[],
      editConfirmed: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let newData;
    this.props.turnOffEditMode() //not sure


    try {
      newData = {
        id: this.props.id,
        title: this.state.title,
        description: this.state.description,
        body: this.state.body
        // ,editMode: false // not sure
      };
  
      this.props.editPost(newData)


    } catch (errors) {
      this.setState({ errors })
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    return (

      <div className="col-lg-4">
        <h3 className="text-white">New Post</h3>
        <div className="card">
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>

              <div className="form-group">
                <label>Title</label>
                <input
                  id="title"
                  name="title"
                  className="form-control"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  id="description"
                  name="description"
                  className="form-control"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Body</label>
                <input
                  id="body"
                  name="body"
                  className="form-control"
                  value={this.state.body}
                  onChange={this.handleChange}
                />
              </div>
              
              {/* When there's an error,alert them */}
              {this.state.errors.length ? (
                <Alert type="danger" messages={this.state.errors} />
              ) : null}


              {/* When item is added successfully, redirect to homepage */}
              {this.state.editConfirmed ? (
                <Redirect to="./" />
              ) : null}

              <button>SAVE</button>
            <button><Link to="/">Cancel</Link></button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { posts: state.posts};
}

const mapDispatchToProps = { editPost }

export default connect(mapStateToProps, mapDispatchToProps)(EditPostForm);

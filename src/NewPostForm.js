import React, { Component } from 'react'
import Alert from "./Alert";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import uuid from 'react-uuid';
import { connect } from "react-redux"
import { postPostToAPI } from "./actions"


class NewPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:"",
      description:"",
      body:"",
      errors: [],
      saveConfirmed: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  async handleSubmit(evt) {
    evt.preventDefault();
    let newData;


    try {
      newData = {
        id: uuid(),
        title: this.state.title,
        description: this.state.description,
        body: this.state.body
      };
    
      this.props.postPostToAPI(newData)
  
      //TODO: check if newData is empty, return error

      this.props.history.push("/")

    } catch (errors) {
      this.setState({ errors })
    }


  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    return (

      <div className="m-4">

        <h3 className="display-5">New Post</h3>
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
                <textarea
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

              {/* When item is added successfully, alert them */}
              {this.state.saveConfirmed ? (
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



const mapDispatchToProps = { postPostToAPI }
export default connect(null, mapDispatchToProps)(NewPostForm);

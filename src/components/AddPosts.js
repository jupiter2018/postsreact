import React from "react";

class AddPosts extends React.Component {
  state = {title:"", author:'', content:'', success:false, error:false};
    handleSubmit = event => {
        let { title, author, content } = this.state
        let postData = {title:title, author:author, content:content}
        event.preventDefault();
        fetch("http://localhost:8000/posts/", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(postData)
        })
          .then(response => response.json())
          .then(result => this.setState({ success: true }))
          .catch(error => this.setState({ error: true }));
        
    }
      
  
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  
  };

  render() {
    return (
      <>
        <h1>Add your post</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="Title">Title:</label>
          <input
            name="title"
            maxLength="50"
            size="50"
            onChange={this.handleChange}
            placeholder="Enter post title"
            required
          />
          <br></br>
          <br></br>
          <br></br>
          <label htmlFor="Author">Author:</label>
          <input
            name="author"
            maxLength="50"
            size="50"
            onChange={this.handleChange}
            placeholder="Enter author name"
            required
          />
          <br></br>
          <br></br>
          <br></br>

          <label htmlFor="Content">Content:</label>
          <br></br>
          <textarea
            name="content"
            onChange={this.handleChange}
            placeholder="Enter your post"
            rows="10"
            cols="50"
            required
          />
          <br></br>
          <button type="submit">Post</button>
            </form>
            {this.state.success &&
                <p>Congrats! you have a added a new post</p>
            }
            {this.state.error &&
                <p>Sorry, something went wrong</p>
            }
      </>
    );
  }
}

export default AddPosts;

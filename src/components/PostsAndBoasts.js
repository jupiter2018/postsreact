import React from "react";
import { PostList } from "./PostList";
import { BoastList } from "./BoastList";
import { Link } from "react-router-dom";

class PostsAndBoasts extends React.Component {
  state = { choice: "All" };
  handleSubmit = event => {
    event.preventDefault();
  };
  handleChange = event => {
    this.setState({ choice: event.target.value });
    console.log(this.state);
  };

  render() {
    return (
      <>
        <h1>Welcome to Posts and Boasts</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="filterByChoice">Filter By Choice:</label>
          <select name="filterByChoice" onChange={this.handleChange}>
            <option value="All">All</option>
            <option value="Posts">Posts</option>
            <option value="Boasts">Boasts</option>
            <option value="Likes">Likes</option>
          </select>

          <button type="submit">Filter</button>
        </form>
        <Link to="/addposts">
          <button type="button">Add Post</button>
        </Link>
        <Link to="/addboasts">
          <button type="button">Add Boast</button>
        </Link>
        {this.state.choice === "Posts" && (
          <>
            <PostList />
          </>
        )}
        {this.state.choice === "Boasts" && (
          <>
            <BoastList />
          </>
        )}
        {this.state.choice === "All" && (
          <>
            <PostList />
            <BoastList />
          </>
        )}
        {this.state.choice === "Likes" && (
          <>
            <PostList postfilter="Likes"/>
            <BoastList boastfilter="Likes"/>
            
          </>
        )}
      </>
    );
  }
}

export default PostsAndBoasts;

import React from "react";

export class PostList extends React.Component {
  state = { posts: [], update: false };
  componentDidMount() {
    console.log(this.props);
    fetch("http://localhost:8000/posts/?format=json")
      //   // mode: "cors",
      //   credentials:'include',
      //   headers: {
      //     Accept: "application/json",
      //     contentType: "application/json",
      //     accessControlAllowOrigin: "http://localhost:3000/"
      //   }
      //)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({ posts: result });
      });
  }
  sortByLikes = (post1, post2) => {
    if (post1.postlikes > post2.postlikes) {
      return -1
    }
    else if (post1.postlikes < post2.postlikes) {
      return 1
    }
    else {
      return 0
    }
  }
  handleUpVote = id => {
    let selectPost = this.state.posts.filter(post => post.id === id);

    let postId = selectPost[0].id;
    let index = this.state.posts.indexOf(selectPost[0]);

    let newLike = selectPost[0].postlikes + 1;
    let postData = { ...selectPost[0], postlikes: newLike };
    console.log(postData);
    fetch(`http://localhost:8000/posts/${postId}/`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        let newPosts = this.state.posts.slice(0);
        newPosts.splice(index, 1, result);
        this.setState({ posts: newPosts });
      });
  };
  handleDownVote = id => {
    let selectPost = this.state.posts.filter(post => post.id === id);

    let postId = selectPost[0].id;
    let index = this.state.posts.indexOf(selectPost[0]);

    let newLike = selectPost[0].postlikes - 1;
    let postData = { ...selectPost[0], postlikes: newLike };
    console.log(postData);
    fetch(`http://localhost:8000/posts/${postId}/`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        let newPosts = this.state.posts.slice(0);
        newPosts.splice(index, 1, result);
        this.setState({ posts: newPosts });
      });
  };
  render() {
    let postsCopy = this.state.posts.slice(0)
    if (this.props.postfilter === "Likes") {
       postsCopy.sort(this.sortByLikes)
    }
    let postList = postsCopy.map(post => {
      let createDate = new Date(Date.parse(post.created));
      return (
        <div key={post.id}>
          <h2>{`Posted by ${post.author} on ${createDate}`}</h2>
          <h3>Title:{post.title}</h3>
          <p>{post.content}</p>
          <p>Likes:{post.postlikes}</p>
          <button onClick={() => this.handleUpVote(post.id)}>Up Vote</button>
          <button onClick={() => this.handleDownVote(post.id)}>
            Down Vote
          </button>
          <hr></hr>
        </div>
      );
    });
    if (postsCopy.length > 0) {
      return (
        <div>
          <h1>Posts</h1>
          <div>{postList}</div>
        </div>
      );
    } else {
      return <div>No posts at this time</div>;
    }
  }
}

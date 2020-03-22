import React from "react";

export class BoastList extends React.Component {
  state = { posts: [], boasts: [] };
  componentDidMount() {
    fetch("http://localhost:8000/boasts/?format=json")
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({ boasts: result });
      });
  }
  sortByLikes = (boast1, boast2) => {
    if (boast1.boastlikes > boast2.boastlikes) {
      return -1;
    } else if (boast1.boastlikes < boast2.boastlikes) {
      return 1;
    } else {
      return 0;
    }
  };
  handleUpVote = id => {
    let selectBoast = this.state.boasts.filter(boast => boast.id === id);

    let boastId = selectBoast[0].id;
    let index = this.state.boasts.indexOf(selectBoast[0]);

    let newLike = selectBoast[0].boastlikes + 1;
    let boastData = { ...selectBoast[0], boastlikes: newLike };
    console.log(boastData);
    fetch(`http://localhost:8000/boasts/${boastId}/`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(boastData)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        let newBoasts = this.state.boasts.slice(0);
        newBoasts.splice(index, 1, result);
        this.setState({ boasts: newBoasts });
      });
  };
  handleDownVote = id => {
    let selectBoast = this.state.boasts.filter(boast => boast.id === id);

    let boastId = selectBoast[0].id;
    let index = this.state.boasts.indexOf(selectBoast[0]);

    let newLike = selectBoast[0].boastlikes - 1;
    let boastData = { ...selectBoast[0], boastlikes: newLike };
    console.log(boastData);
    fetch(`http://localhost:8000/boasts/${boastId}/`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(boastData)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        let newBoasts = this.state.boasts.slice(0);
        newBoasts.splice(index, 1, result);
        this.setState({ boasts: newBoasts });
      });
  };

  render() {
    let boastsCopy = this.state.boasts.slice(0);
    if (this.props.boastfilter === "Likes") {
      boastsCopy.sort(this.sortByLikes);
    }
    let boastList = boastsCopy.map(boast => {
      let createDate = new Date(Date.parse(boast.created));
      return (
        <div key={boast.id}>
          <h2>{`Posted by ${boast.author} on ${createDate}`}</h2>
          <h3>{boast.title}</h3>
          <p>{boast.content}</p>
          <p>Likes:{boast.boastlikes}</p>
          <button onClick={() => this.handleUpVote(boast.id)}>Up Vote</button>
          <button onClick={() => this.handleDownVote(boast.id)}>
            Down Vote
          </button>
          <hr></hr>
        </div>
      );
    });
    if (this.state.boasts.length > 0) {
      return (
        <div>
          <h1>Boasts</h1>
          <div>{boastList}</div>
        </div>
      );
    } else {
      return <div>No boasts at this time</div>;
    }
  }
}

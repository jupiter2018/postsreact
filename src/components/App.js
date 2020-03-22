import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PostsAndBoasts from './PostsAndBoasts'
import AddPosts from './AddPosts'
import AddBoasts from './AddBoasts'
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={PostsAndBoasts} />
          <Route path='/addposts' exact component={AddPosts}/>
          <Route path='/addboasts' exact component={AddBoasts}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

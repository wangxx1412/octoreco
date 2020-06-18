import React from "react";
import Header from "./Header";
import PostList from "./posts/PostList";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div style={{ backgroundColor: "#fafafa" }}>
          <PostList />
        </div>
      </div>
    );
  }
}

export default Main;

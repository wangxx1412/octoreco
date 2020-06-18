import React, { Component } from "react";
import Header from "./Header";
import PostForm from "./posts/PostForm";
import PostImg from "./posts/PostImg";

class PostNew extends Component {
  state = { showConfirm: false };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div>
            <PostImg
              showConfirm={this.state.showConfirm}
              onCancel={() => this.setState({ showConfirm: false })}
            />
            <PostForm
              onPostSubmit={() => this.setState({ showConfirm: true })}
              showConfirm={this.state.showConfirm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PostNew;

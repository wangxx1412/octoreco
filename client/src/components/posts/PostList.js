import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { like, unlike, save, unsave } from "./apiPost";
import { renderPosts } from "./renderPosts";
import { Redirect } from "react-router-dom";
import { checkLike, checkSave } from "./helper";

class PostList extends Component {
  state = {
    loaded: false,
    posts: "",
    auth: "",
    redirectToSignin: false,
    like: Array(20).fill(false),
    likes: Array(20).fill(0),
    save: Array(20).fill(false),
  };

  async componentDidMount() {
    await this.props.fetchUser().then(() => {
      this.setState({
        auth: this.props.auth,
      });
    });
    await this.props
      .fetchPosts()
      .then(() => {
        if (!this.state.auth) {
          this.setState({
            posts: this.props.posts,
            likes: this.props.posts.map((post) => post.likes.length),
          });
        } else {
          this.setState({
            posts: this.props.posts,
            like: this.props.posts.map((post) =>
              checkLike(post.likes, this.state)
            ),
            likes: this.props.posts.map((post) => post.likes.length),
            save: this.props.posts.map((post) => checkSave(post, this.state)),
          });
        }
      })
      .then(() => {
        this.setState({
          loaded: true,
        });
      });
  }

  likeToggle = (post, i) => {
    if (!this.state.auth) {
      this.setState({ redirectToSignin: true });
      return false;
    }
    const userId = this.state.auth._id;
    const postId = post._id;

    this.state.like[i]
      ? unlike(userId, postId).then((data) => {
          const newLike = [...this.state.like];
          newLike[i] = !this.state.like[i];
          const numLikes = [...this.state.likes];
          numLikes[i] = data.likes.length;
          this.setState({
            like: newLike,
            likes: numLikes,
          });
        })
      : like(userId, postId).then((data) => {
          const newLike = [...this.state.like];
          newLike[i] = !this.state.like[i];
          const numLikes = [...this.state.likes];
          numLikes[i] = data.likes.length;
          this.setState({
            like: newLike,
            likes: numLikes,
          });
        });
  };

  saveToggle = (post, i) => {
    if (!this.state.auth) {
      this.setState({ redirectToSignin: true });
      return false;
    }
    const userId = this.state.auth._id;
    const postId = post._id;

    this.state.save[i]
      ? unsave(userId, postId).then(() => {
          const newSave = [...this.state.save];
          newSave[i] = !this.state.save[i];
          this.setState({
            save: newSave,
          });
        })
      : save(userId, postId).then(() => {
          const newSave = [...this.state.save];
          newSave[i] = !this.state.save[i];
          this.setState({
            save: newSave,
          });
        });
  };

  render() {
    const { loaded, posts, like, likes, save, redirectToSignin } = this.state;

    if (redirectToSignin) {
      return <Redirect to={`/`} />;
    }

    return (
      <div className="container" style={{ paddingTop: "40px" }}>
        {loaded
          ? renderPosts(
              posts,
              like,
              likes,
              save,
              this.likeToggle,
              this.saveToggle
            )
          : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
    auth: state.auth,
  };
}

export default connect(mapStateToProps, actions)(PostList);

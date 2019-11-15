import React, { Component } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import * as actions from "../actions";
import { like, unlike, save, unsave } from "./posts/apiPost";
import { renderPosts } from "../components/posts/renderPosts";

class User extends Component {
  state = {
    loaded: false,
    posts: "",
    auth: "",
    showAuthReq: false,
    redirectToHome: false,
    redirectToSignin: false,
    user: { following: [], followers: [] },
    following: false,
    like: Array(12).fill(false),
    likes: Array(12).fill(0),
    save: Array(12).fill(false)
  };

  // check follow
  // checkFollow = user => {
  //     const match = user.followers.find(follower => {
  //         // one id has many other ids (followers) and vice versa
  //         return follower._id === jwt.user._id;
  //     });
  //     return match;
  // };

  // clickFollowButton = callApi => {
  //     const userId = isAuthenticated().user._id;
  //     const token = isAuthenticated().token;

  //     callApi(userId, token, this.state.user._id).then(data => {
  //         if (data.error) {
  //             this.setState({ error: data.error });
  //         } else {
  //             this.setState({ user: data, following: !this.state.following });
  //         }
  //     });
  // };

  checkLike = likes => {
    const userId = this.state.auth && this.state.auth._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  checkSave = post => {
    const postId = post._id;
    let match = this.state.auth.savedPosts.indexOf(postId) !== -1;
    return match;
  };

  async componentDidMount() {
    const { userid } = this.props.match.params;

    await this.props.fetchUser().then(() => {
      this.setState({
        auth: this.props.auth
      });
    });

    if (!this.state.auth) {
      await this.setState({
        showAuthReq: true,
        loaded: true
      });
    } else {
      await this.props
        .fetchUserPosts(userid)
        .then(() => {
          this.setState({
            posts: this.props.posts,
            like: this.props.posts.map(post => this.checkLike(post.likes)),
            likes: this.props.posts.map(post => post.likes.length),
            save: this.props.posts.map(post => this.checkSave(post))
          });
        })
        .then(() => {
          this.setState({
            loaded: true
          });
        });
    }
  }

  likeToggle = (post, i) => {
    if (!this.state.auth) {
      this.setState({ redirectToSignin: true });
      return false;
    }
    const userId = this.state.auth._id;
    const postId = post._id;

    this.state.like[i]
      ? unlike(userId, postId).then(data => {
          const newLike = [...this.state.like];
          newLike[i] = !this.state.like[i];
          const numLikes = [...this.state.likes];
          numLikes[i] = data.likes.length;
          this.setState({
            like: newLike,
            likes: numLikes
          });
        })
      : like(userId, postId).then(data => {
          const newLike = [...this.state.like];
          newLike[i] = !this.state.like[i];
          const numLikes = [...this.state.likes];
          numLikes[i] = data.likes.length;
          this.setState({
            like: newLike,
            likes: numLikes
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
            save: newSave
          });
        })
      : save(userId, postId).then(() => {
          const newSave = [...this.state.save];
          newSave[i] = !this.state.save[i];
          this.setState({
            save: newSave
          });
        });
  };

  render() {
    const { loaded, showAuthReq, posts, like, likes, save } = this.state;
    return (
      <div>
        <Header />
        <div className="container" style={{ paddingTop: "40px" }}>
          {loaded ? (
            showAuthReq ? (
              <div className="md:mx-20 lg:mx-32" role="alert">
                <div className="bg-red text-white text-2xl font-bold rounded-t px-4 py-2">
                  Sorry...
                </div>
                <div className="flex justify-between border border-t-0 border-red-light rounded-b bg-red-lightest px-4 py-3 text-red-dark">
                  <span>You must log in to view user's page.</span>
                  <a
                    href="/posts"
                    className="font-bold"
                    style={{ color: "inherit" }}
                  >
                    Back to posts
                  </a>
                </div>
              </div>
            ) : (
              renderPosts(posts, like, likes, save)
            )
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  actions
)(User);

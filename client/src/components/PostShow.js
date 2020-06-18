import React, { Component } from "react";
import Header from "./Header";
import * as actions from "../actions";
import {
  like,
  unlike,
  save,
  unsave,
  comment,
  uncomment,
  remove,
} from "./posts/apiPost";
import { checkLike, checkSave } from "./posts/helper";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Card,
  Carousel,
  Container,
  Dropdown,
  Form,
  InputGroup,
} from "react-bootstrap";
import { IconContext } from "react-icons";
import {
  FaRegHeart,
  FaRegBookmark,
  FaHeart,
  FaBookmark,
  FaTimes,
} from "react-icons/fa";
import DropdownAngle from "./posts/Dropdown";

class PostShow extends Component {
  state = {
    post: "",
    auth: "",
    redirectToPosts: false,
    redirectToSignin: false,
    like: false,
    likes: 0,
    save: false,
    comments: [],
    newComment: "",
  };

  async componentDidMount() {
    await this.props.fetchUser().then(() => {
      this.setState({
        auth: this.props.auth,
      });
    });
    const postId = this.props.match.params.postid;
    const { fetchPost } = this.props;
    await fetchPost(postId).then(() => {
      if (!this.state.auth) {
        this.setState({
          post: this.props.post,
          likes: this.props.post.likes.length,
          comments: this.props.post.comments,
        });
      } else {
        this.setState({
          post: this.props.post,
          likes: this.props.post.likes.length,
          like: checkLike(this.props.post.likes, this.state),
          save: checkSave(this.props.post, this.state),
          comments: this.props.post.comments,
        });
      }
    });
  }

  likeToggle = () => {
    if (!this.state.auth) {
      this.setState({ redirectToSignin: true });
      return false;
    }
    const userId = this.state.auth._id;
    const postId = this.state.post._id;

    this.state.like
      ? unlike(userId, postId).then((data) => {
          this.setState({
            like: !this.state.like,
            likes: data.likes.length,
          });
        })
      : like(userId, postId).then((data) => {
          this.setState({
            like: !this.state.like,
            likes: data.likes.length,
          });
        });
  };

  saveToggle = () => {
    if (!this.state.auth) {
      this.setState({ redirectToSignin: true });
      return false;
    }
    const userId = this.state.auth._id;
    const postId = this.state.post._id;

    this.state.save
      ? unsave(userId, postId).then(() => {
          this.setState({
            save: !this.state.save,
          });
        })
      : save(userId, postId).then(() => {
          this.setState({
            save: !this.state.save,
          });
        });
  };

  handleChange = (event) => {
    this.setState({ newComment: event.target.value });
  };

  handleSubmit = (event) => {
    if (!this.state.auth) {
      this.setState({ redirectToSignin: true });
      return false;
    }
    event.preventDefault();
    comment(this.state.auth._id, this.state.post._id, {
      comment: this.state.newComment,
    }).then((data) => {
      this.setState({
        comments: data.comments,
        newComment: "",
      });
    });
  };

  deletePost = () => {
    const postId = this.state.post._id;
    const userId = this.state.post.user._id;
    const imageUrl = this.state.post.imageUrl;

    remove(userId, postId, imageUrl).then((data) => {
      this.setState({ redirectToPosts: true });
    });
  };

  deletePostConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete your post?");
    if (answer) {
      this.deletePost();
    }
  };

  deleteComment = (comment) => {
    const userId = this.state.auth._id;
    const postId = this.state.post._id;

    uncomment(userId, postId, comment).then((data) => {
      this.setState({ comments: data.comments });
    });
  };

  deleteConfirmed = (comment) => {
    let answer = window.confirm(
      "Are you sure you want to delete your comment?"
    );
    if (answer) {
      this.deleteComment(comment);
    }
  };

  renderPost = (post) => {
    const { auth, like, likes, save } = this.state;
    const s3Url = "https://s3-us-west-2.amazonaws.com/octoreco-bucket-1/";

    return (
      <Card style={{ maxWidth: "40rem" }}>
        <Card.Header style={{ backgroundColor: "white" }}>
          <Link
            to={`/user/${post.user._id}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <b> {post.user.username}</b>
          </Link>
          <span style={{ position: "absolute", right: "30px", zIndex: "2" }}>
            <DropdownAngle>
              <Dropdown.Item disabled>Follow</Dropdown.Item>
              <Dropdown.Item href={`/posts`}>Return to Posts</Dropdown.Item>
              {auth && auth._id === post.user._id && (
                <>
                  <Dropdown.Item
                    style={{ color: "red" }}
                    onClick={this.deletePostConfirmed}
                  >
                    Delete this post
                  </Dropdown.Item>
                </>
              )}
            </DropdownAngle>
          </span>
        </Card.Header>
        <Carousel interval={null}>
          {post.imageUrl.map((imgUrl, index) => {
            return (
              <Carousel.Item key={imgUrl + index}>
                <Card.Img variant="top" src={s3Url + imgUrl} />
              </Carousel.Item>
            );
          })}
        </Carousel>
        <Card.Body>
          <Card.Text style={{ position: "relative" }}>
            {like ? (
              <span style={{ position: "absolute" }} onClick={this.likeToggle}>
                <IconContext.Provider
                  value={{
                    color: "#E1306C",
                    size: "1.5em",
                    className: "global-class-name",
                  }}
                >
                  <FaHeart />
                </IconContext.Provider>{" "}
                {likes} Like
              </span>
            ) : (
              <span style={{ position: "absolute" }} onClick={this.likeToggle}>
                <IconContext.Provider
                  value={{ size: "1.5em", className: "global-class-name" }}
                >
                  <FaRegHeart />
                </IconContext.Provider>{" "}
                {likes} Like
              </span>
            )}

            {save ? (
              <span
                style={{ position: "absolute", right: "10px" }}
                onClick={this.saveToggle}
              >
                <IconContext.Provider
                  value={{ size: "1.5em", className: "global-class-name" }}
                >
                  <FaBookmark />
                </IconContext.Provider>
              </span>
            ) : (
              <span
                style={{ position: "absolute", right: "10px" }}
                onClick={this.saveToggle}
              >
                <IconContext.Provider
                  value={{ size: "1.5em", className: "global-class-name" }}
                >
                  <FaRegBookmark />
                </IconContext.Provider>
              </span>
            )}
          </Card.Text>
          <div style={{ marginTop: "40px" }}>
            <b>{post.user.username}</b> {post.content}
          </div>
          <Card.Text>
            <small className="text-muted" style={{ marginTop: "10px" }}>
              on {new Date(post.created).toDateString()}
            </small>
          </Card.Text>

          <Form
            onSubmit={this.handleSubmit}
            style={{ paddingBottom: "12px", borderBottom: "1px solid #d9dde2" }}
          >
            <Form.Label>
              <b>Comments</b>
            </Form.Label>
            <InputGroup>
              <Form.Control
                style={{ boxShadow: "none" }}
                size="sm"
                type="text"
                value={this.state.newComment}
                onChange={this.handleChange}
                placeholder="Comments here..."
              />
              <InputGroup.Append>
                <Button
                  className="bg-purple-dark hover:bg-purple border-purple-dark"
                  size="sm"
                  type="submit"
                  style={{ zIndex: "1", boxShadow: "none" }}
                >
                  Post
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          <div style={{ marginTop: "12px" }}>
            {this.state.comments.map((comment) => {
              if (comment.postedBy == null) {
                return (
                  <div
                    key={comment._id}
                    style={{
                      fontSize: "12px",
                      paddingBottom: "12px",
                      borderBottom: "1px solid #d9dde2",
                      marginBottom: "1rem",
                    }}
                  >
                    <i>
                      <span className="font-bold text-grey">
                        User Not Exist
                      </span>
                    </i>{" "}
                    {comment.comment}
                    <div>
                      <small
                        className="text-muted"
                        style={{ marginTop: "10px" }}
                      >
                        on {new Date(comment.created).toDateString()}
                      </small>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={comment._id}
                    style={{
                      fontSize: "12px",
                      paddingBottom: "12px",
                      borderBottom: "1px solid #d9dde2",
                      marginBottom: "1rem",
                    }}
                  >
                    <b>
                      <Link
                        to={`/user/${comment.postedBy._id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {comment.postedBy.username}
                      </Link>
                    </b>{" "}
                    {comment.comment}
                    <div>
                      <small
                        className="text-muted"
                        style={{ marginTop: "10px" }}
                      >
                        on {new Date(comment.created).toDateString()}
                      </small>
                      {auth && auth._id === comment.postedBy._id && (
                        <>
                          <span
                            onClick={() => this.deleteConfirmed(comment)}
                            className="text-danger float-right mr-1"
                          >
                            <FaTimes />
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </Card.Body>
      </Card>
    );
  };

  render() {
    const { post, redirectToPosts, redirectToSignin } = this.state;

    if (redirectToPosts) {
      return <Redirect to={`/posts`} />;
    } else if (redirectToSignin) {
      return <Redirect to={`/`} />;
    }

    return (
      <div>
        <Header />
        <div style={{ backgroundColor: "#fafafa" }}>
          <Container>
            {!post ? (
              <div style={{ marginTop: "100px", textAlign: "center" }}>
                <h2>Loading...</h2>
                <h4>If no response, please refresh the page</h4>
              </div>
            ) : (
              <div className="lg:ml-20" style={{ paddingTop: "40px" }}>
                {this.renderPost(post)}
              </div>
            )}
          </Container>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.post,
    auth: state.auth,
  };
}
export default connect(mapStateToProps, actions)(PostShow);

import React, { Component } from 'react';
import * as actions from '../actions';
import { like, unlike } from './posts/apiPostLike';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import { Container } from 'react-bootstrap'
import { FaRegHeart, FaRegBookmark, FaHeart, FaBookmark } from "react-icons/fa";

class PostShow extends Component {
    state = {
        post: "",
        redirectToHome: false,
        redirectToSignin: false,
        like: false,
        likes: 0,
        comments: []
    };

    checkLike = likes => {
        const userId = this.props.auth && this.props.auth._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    };

    componentDidMount = () => {
        const postId = this.props.match.params.postid;
        const {fetchPost} = this.props;
        fetchPost(postId).then(()=> {
                this.setState({
                    post: this.props.post,
                    likes: this.props.post.likes.length,
                    like: this.checkLike(this.props.post.likes),
                    comments: this.props.post.comments
                });
            
        });
    };

    likeToggle = () => {
        if (!this.props.auth) {
            this.setState({ redirectToSignin: true });
            return false;
        }
        const userId = this.props.auth._id;
        const postId = this.state.post._id;

        this.state.like ? 
        unlike(userId, postId).then(data => {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                });
        })
        : like(userId, postId).then(data => {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                });
        });;
    };

    // deletePost = () => {
    //     const postId = this.props.match.params.postId;
    //     remove(postId,).then(data => {
    //         if (data.error) {
    //             console.log(data.error);
    //         } else {
    //             this.setState({ redirectToHome: true });
    //         }
    //     });
    // };

    // deleteConfirmed = () => {
    //     let answer = window.confirm(
    //         "Are you sure you want to delete your post?"
    //     );
    //     if (answer) {
    //         this.deletePost();
    //     }
    // };

    renderPost = post => {
        const posterId = post.user ? `/user/${post.user._id}` : "";
        const posterName = post.user ? post.user.username : " Unknown";

        const { like, likes } = this.state;

        return (
            <div className="card-body">
                {/* <img
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${
                        post._id
                    }`}
                    alt={post.title}
                    onError={i => (i.target.src = `${DefaultPost}`)}
                    className="img-thunbnail mb-3"
                    style={{
                        height: "300px",
                        width: "100%",
                        objectFit: "cover"
                    }}
                /> */}

                {like ? (
                    <h3 onClick={this.likeToggle}>
                    <FaHeart />
                        {" "}
                        {likes} Like
                    </h3>
                ) : (
                    <h3 onClick={this.likeToggle}>
                    <FaRegHeart />
                        {" "}
                        {likes} Like
                    </h3>
                )}

                <p>{post.content}</p>
                <br />
                <p>
                    Posted by <Link to={`${posterId}`}>{posterName} </Link>
                    on {new Date(post.created).toDateString()}
                </p>
                <div>
                    <Link
                        to={`/`}
                        className="btn btn-raised btn-primary btn-sm mr-5"
                    >
                        Back to posts
                    </Link>

                    {this.props.auth &&
                        this.props.auth._id === post.user._id && (
                            <>
                                <Link
                                    to={`/post/edit/${post._id}`}
                                    className="btn btn-raised btn-warning btn-sm mr-5"
                                >
                                    Update Post
                                </Link>
                                <button
                                    //onClick={}
                                    className="btn btn-raised btn-danger"
                                >
                                    Delete Post
                                </button>
                            </>
                        )}

                    {/* <div>
                        {isAuthenticated().user &&
                            isAuthenticated().user.role === "admin" && (
                                <div class="card mt-5">
                                    <div className="card-body">
                                        <h5 className="card-title">Admin</h5>
                                        <p className="mb-2 text-danger">
                                            Edit/Delete as an Admin
                                        </p>
                                        <Link
                                            to={`/post/edit/${post._id}`}
                                            className="btn btn-raised btn-warning btn-sm mr-5"
                                        >
                                            Update Post
                                        </Link>
                                        <button
                                            onClick={this.deleteConfirmed}
                                            className="btn btn-raised btn-danger"
                                        >
                                            Delete Post
                                        </button>
                                    </div>
                                </div>
                            )}
                    </div> */}
                </div>
            </div>
        );
    };

    render() {
        const { post, redirectToHome, redirectToSignin } = this.state;

        if (redirectToHome) {
            return <Redirect to={`/`} />;
        } else if (redirectToSignin) {
            return <Redirect to={`/signin`} />;
        }

        return (
            <div>
                <Container>
                <h2>{post.title}</h2>

                {!post ? (
                    <div>
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    this.renderPost(post)
                )}
                </Container>
            </div>
        );
    }
}
function mapStateToProps(state){
    return { post:state.posts.post};
}
export default connect(mapStateToProps, actions)(PostShow);
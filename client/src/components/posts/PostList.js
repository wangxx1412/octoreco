import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import { like, unlike, save, unsave } from './apiPost';
import {Card} from 'react-bootstrap'
import { FaRegHeart, FaRegBookmark, FaHeart, FaBookmark } from "react-icons/fa";
import { IconContext } from "react-icons";
import mabu from '../../assets/sample-1.jpg'

class PostList extends Component {
    state = {
        loaded: false,
        posts: "",
        auth: "",
        redirectToHome: false,
        redirectToSignin: false,
        like: Array(6).fill(false),
        likes: Array(6).fill(0),
        save: Array(6).fill(false),
    };

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
        await this.props.fetchUser().then(()=>{
            this.setState({
                auth: this.props.auth
            })
        });
        await this.props.fetchPosts().then(()=>{
            if(!this.state.auth){
                this.setState({
                    posts: this.props.posts,
                    like: this.props.posts.map(post=>this.checkLike(post.likes)),
                    likes: this.props.posts.map(post=>post.likes.length)
                })
            } else{
            this.setState({
                posts: this.props.posts,
                like: this.props.posts.map(post=>this.checkLike(post.likes)),
                likes: this.props.posts.map(post=>post.likes.length),
                save: this.props.posts.map(post=>this.checkSave(post))
            })}
        }).then(()=>{
            this.setState({
                loaded:true
            })
        });
    }
    
    likeToggle = (post,i) => {
        if (!this.state.auth) {
            this.setState({ redirectToSignin: true });
            return false;
        }
        const userId = this.state.auth._id;
        const postId = post._id;

        this.state.like[i] ? 
        unlike(userId, postId).then(data => {
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
        });;
    };

    saveToggle = (post, i) => {
        if (!this.state.auth) {
            this.setState({ redirectToSignin: true });
            return false;
        }
        const userId = this.state.auth._id;
        const postId = post._id;

        this.state.save[i] ? 
        unsave(userId, postId).then(() => {
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
        });;
    };

    renderPosts=(posts)=>{   
       return posts.map((post, index)=>{
            return (
                <div key={post._id}>
                <Card key={index} style={{maxWidth:"40rem", marginBottom:"60px"}}>
                <Card.Header style={{backgroundColor: "white"}}><b>{post.user.username}</b></Card.Header>
                <Card.Img variant="top" src={mabu}/>
                    <Card.Body>
                    <Card.Text style={{ position: "relative"}}>
                    {this.state.like[index] ? (
                        <span style={{ position: "absolute" }} onClick={()=>{this.likeToggle(post, index)}}>
                        <IconContext.Provider value={{ color: "#E1306C", size:"1.5em", className: "global-class-name" }}>
                        <FaHeart />
                        </IconContext.Provider>
                            {" "}
                            {this.state.likes[index]} Like
                        </span>
                    ) : (
                        <span style={{ position: "absolute" }} onClick={()=>{this.likeToggle(post, index)}}>
                        <IconContext.Provider value={{ size:"1.5em", className: "global-class-name" }}>
                        <FaRegHeart />
                        </IconContext.Provider>
                            {" "}
                            {this.state.likes[index]} Like
                        </span>
                    )}

                    {this.state.save[index] ? (
                        <span style={{ position: "absolute", right:"10px" }} onClick={()=>{this.saveToggle(post, index)}}>
                        <IconContext.Provider value={{ size:"1.5em", className: "global-class-name" }}>
                        <FaBookmark />
                        </IconContext.Provider>
                        </span>
                    ) : (
                        <span style={{ position: "absolute", right: "10px" }} onClick={()=>{this.saveToggle(post, index)}}>
                        <IconContext.Provider value={{ size:"1.5em", className: "global-class-name" }}>
                        <FaRegBookmark />
                        </IconContext.Provider>
                        </span>
                    )}      
                    </Card.Text>
                    <div style={{marginTop: "40px"}}> <b>{post.user.username}</b> {post.content}</div>
                    <Card.Text>
                        <small className="text-muted" style={{ marginTop:"10px"}}>
                        on {new Date(post.created).toDateString()}
                        </small>
                        <Link to={`/posts/${post._id}`}>
                        <span style={{ position: "absolute", right: "10px" }}>
                        <small>Read more...</small> 
                        </span>
                        </Link>
                    </Card.Text>
                    </Card.Body>
                </Card>
                </div>
            )
        })
    }

    render() {      
        const { loaded, posts} = this.state;
        return (
          <div style={{paddingTop: "40px"}}>
            {loaded ?
                this.renderPosts(posts)
                :null}
        </div>
        );
    }
}

function mapStateToProps(state){
    return { 
        posts: state.posts.posts,
        auth: state.auth
    };
}

export default connect(mapStateToProps, actions)(PostList);
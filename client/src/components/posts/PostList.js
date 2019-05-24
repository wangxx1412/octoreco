import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { like, unlike, save, unsave } from './apiPost';
import { renderPosts } from './renderPosts';

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

    render() {      
        const { loaded, posts, like, likes, save} = this.state;
        return (
          <div style={{paddingTop: "40px"}}>
            {loaded ? renderPosts(posts, like, likes, save, this.likeToggle, this.saveToggle) :null}
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import {Card} from 'react-bootstrap'
import { FaRegHeart, FaRegBookmark, FaHeart, FaBookmark } from "react-icons/fa";
import mabu from '../../assets/sample-1.jpg'

class PostList extends Component {
    constructor(props) {
        super(props)
        this.state = {
          loaded: false,
          like: []
        }
      }

    async componentDidMount() {
        await this.props.fetchPosts();
        this.setState({loaded: true})
    }
    
    renderLike = (post, index)=>{
        const {likePost} = this.props;
        if(post.likes.includes(this.props.auth._id)){
            return <FaHeart
            onClick={()=>likePost(post.id, "cancel")
        } />
        } else{
            return <FaRegHeart 
            onClick={()=>likePost(post.id, "yes")
        } />
        }
    }

    renderPosts=(posts)=>{   
       return posts.map((post, index)=>{
            return (
                <div key={post.id+ index}>
                <Card style={{ width: '20rem' }}>
                <Card.Header> {post.username}</Card.Header>
                <Card.Img variant="top" src={mabu} />
                <Card.Body>
                <Card.Text>{post.likes.length+" likes"}</Card.Text>
                <div >
                {this.renderLike(post, index)}
                </div>    
                <Card.Link><FaRegBookmark /></Card.Link>
                    <Card.Text>
                    <b>{post.username+' '}</b>
                    {post.content}
                    </Card.Text>
                </Card.Body>
                </Card>
                </div>
            )
        })
    }

    render() {
        
        const { posts } = this.props;
        return (
            <div>
                {this.state.loaded && this.props.auth?
                    this.renderPosts(posts)
                    :null}
            </div>
        );
    }
}

function mapStateToProps(state){
    return { posts:state.posts.posts};
}

export default connect(mapStateToProps, actions)(PostList);
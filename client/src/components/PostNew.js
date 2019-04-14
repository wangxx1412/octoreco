import React, { Component } from 'react';
import PostForm from './posts/PostForm';
import PostImg from './posts/PostImg';

class PostNew extends Component {
    state = { showConfirm: false };
    
    renderContent(){
        return (
            <div>
                <PostImg 
                showConfirm={this.state.showConfirm}
                onCancel={()=>this.setState({showConfirm: false})}
                />
                <PostForm 
                onPostSubmit={() => this.setState({ showConfirm: true })}
                showConfirm ={this.state.showConfirm}
                />
            </div> 
        );
    }
    render(){
        return(
            <div>
                <h1>
                Create a Post!
                </h1>
                {this.renderContent()}
            </div>
        );
    }
}

export default PostNew;
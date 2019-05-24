import React, { Component } from 'react';
import Header from './Header';
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
                <Header />
                <div className="container">
                {this.renderContent()}
                </div>
            </div>
        );
    }
}

export default PostNew;
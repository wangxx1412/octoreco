import React from 'react';
import PostList from './posts/PostList';
import {Container} from 'react-bootstrap'

class Main extends React.Component {
  render(){
    return (
      <div>
        <Container>
          <h1>
          Main
          </h1>
          Here is Postlists and some info
          <PostList auth={this.props.auth} />
          </Container>
      </div>
    );
  }
};

export default Main;
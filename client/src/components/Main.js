import React from 'react';
import PostList from './posts/PostList';
import {Container} from 'react-bootstrap'

class Main extends React.Component {
  render(){
    return (
      <div style={{backgroundColor:"#fafafa"}}>
        <Container>
          <PostList />
        </Container>
      </div>
    );
  }
};

export default Main;
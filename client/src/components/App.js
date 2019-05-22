import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import PostNew from './PostNew';
import PostShow from './PostShow';
import Main from './Main';
import User from './User';
import Setting from './Setting';

class App extends Component {
  async componentDidMount() {
    await this.props.fetchUser();
    // this.setState({loaded: true})
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <Switch>
          <Route exact path="/settings/:userid" component={ Setting } />
          <Route exact path="/user/:userid" component={ User } />
          <Route exact path="/posts/new" component={ PostNew } />
          <Route exact path="/posts/:postid" component={ PostShow } />
          <Route path="/posts" component={ Main } />
          <Route 
          path="/" 
          render={(props)=><Landing {...props} auth={this.props.auth}/>}
          />
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state){
  return {auth:state.auth}
}
export default connect(mapStateToProps, actions)(App);

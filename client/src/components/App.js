import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from "./Landing";
import PostNew from "./PostNew";
import PostShow from "./PostShow";
import Main from "./Main";
import User from "./User";
import Setting from "./Setting";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/settings/:userid" component={Setting} />
            <Route exact path="/user/:userid" component={User} />
            <Route exact path="/posts/new" component={PostNew} />
            <Route exact path="/posts/:postid" component={PostShow} />
            <Route path="/posts" component={Main} />
            <Route path="/" component={Landing} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

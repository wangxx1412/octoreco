import React from 'react';
import {Person, Setting} from '../assets/svg'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      user:"",
      loaded: false
    };
  }

  async componentDidMount(){
    await this.props.fetchUser().then(()=>{
      this.setState({
          user: this.props.user
      })
    }).then(()=>{
      this.setState({loaded:true})
    })
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const {user, loaded} = this.state;
    return (
      <nav className="flex items-center justify-between flex-wrap bg-purple-dark p-6">
        <div className="flex items-center text-grey-lightest lg:ml-32">
          <span className="font-bold text-xl">
          {user?<Link to="/posts" style={{color:"inherit", textDecoration:"none"}}>Octoreco</Link>:
          <Link to="/" style={{color:"inherit", textDecoration:"none"}}>Octoreco</Link>}
          </span>
        </div>
        {loaded?
        <div className="flex">
          {user ?
          <div className="flex">
            <div className="flex items-center mr-4"><a href={`http://localhost:3000/user/${user._id}` }style={{color:"inherit", textDecoration:"none"}}><Person /></a></div>
            <div className="flex items-center inline-block lg:mr-32">
              <a href={`http://localhost:3000/settings/${user._id}`} style={{color:"inherit", textDecoration:"none"}}>
              <Setting />
              </a>
            </div>
          </div>
          : 
          <div className="inline-block lg:mr-32 font-bold text-grey-lightest">
          <a href="http://localhost:3000" style={{color:"inherit", textDecoration:"none"}}>Login Here</a>
          </div>}
        </div>
       : null}
      </nav>
    );
  }
}

function mapStateToProps(state){
  return { 
      user: state.auth
  };
}

export default connect(mapStateToProps, actions)(Header);

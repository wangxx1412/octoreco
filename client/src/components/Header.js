import React from 'react';
import {Person, New, Setting} from '../assets/svg'
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
      <nav className="flex items-center justify-between flex-wrap bg-white p-6 border-b-2 border-purple-light shadow-sm">
        <div className="flex items-center text-purple-dark md:ml-24 lg:ml-32">
          <span className="font-bold text-xl lg:ml-20">
          {user?<Link to="/posts" style={{color:"inherit", textDecoration:"none"}}>Octoreco</Link>:
          <Link to="/" style={{color:"inherit", textDecoration:"none"}}>Octoreco</Link>}
          </span>
        </div>
        {loaded?
        <div className="flex">
          {user ?
          <div className="flex text-purple-dark  md:mr-24 lg:mr-32">
            <div className="flex items-center mr-4"><Link to={`/posts/new` }style={{color:"inherit", textDecoration:"none"}}><New /></Link></div>
            <div className="flex items-center mr-4"><Link to={`user/${user._id}` }style={{color:"inherit", textDecoration:"none"}}><Person /></Link></div>
            <div className="flex items-center inline-block">
              <Link className="lg:mr-20" to={`/settings/${user._id}`} style={{color:"inherit", textDecoration:"none"}}>
              <Setting />
              </Link>
            </div>
          </div>
          : 
          <div className="inline-block font-bold text-purple-dark">
          <Link to="/" style={{color:"inherit", textDecoration:"none"}}>Login Here</Link>
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

import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Redirect } from "react-router-dom";
import Header from './Header';
import { Mail, Telegram, Twitter } from '../assets/svg';
import {changeUserName, deleteUser} from './posts/apiPost';

class Setting extends Component {
    state = {
        user:"",
        loaded:false,
        newusername:"",
        redirectToSignin:false
    }
    async componentDidMount(){
        await this.props.fetchUser().then(()=>{
          this.setState({
              user: this.props.user
            })
        }).then(()=>{this.setState({loaded:true})})
    };

    getEmail = (user)=>{
        if(user.google){
            return user.google.email
        } else {
            return user.facebook.email
        }
    }

    handleChange = (event) => {
        this.setState({newusername: event.target.value});
    }

    handleSubmit = (event) => {
        if (!this.state.user) {
            this.setState({ redirectToSignin: true });
            return false;
        }
        event.preventDefault();
        changeUserName(this.state.user._id, this.state.newusername).then(
            data => {
                this.setState({
                    newusername: ""
                });
            }
        );
    }

    deleteAccount = user => {
        const userId = user._id

        deleteUser(userId).then(data => {
            this.props.history.push('/');
        });
    };

    deleteConfirmed = user => {
        let answer = window.confirm(
            "Are you sure you want to Delete your Account?"
        );
        if (answer) {
            this.deleteAccount(user);
        }
    };

    render(){
        const { user, loaded, redirectToSignin } = this.state;
     
       if (redirectToSignin) {
            return <Redirect to={`/`} />;
        }

        return(
            <div style={{backgroundColor:"#fafafa"}} className="h-full pb-32">
                <Header />
                {loaded? 
                <div className="flex items-center justify-center container h-full md:w-3/5 mt-20 bg-purple-lightest border-purple-dark border-2 rounded shadow">
                    <div className="w-full rounded overflow-hidden">
                        <div className="flex my-3 border-purple-dark border-b-2">
                            <div className="flex w-1/4 h-auto font-bold text-purple mx-2 my-2 lg:mx-3 lg:my-3">
                            Account Info
                            </div>
                            <div className="text-purple w-3/4 h-auto mx-2 my-2 lg:mx-3 lg:my-3">
                                <div className="font-display mb-2">{`Login Method: ${user.method}`}</div>
                                <div className="font-display mb-2">Username: <b>{user.username}</b></div>
                                <div className="font-display mb-2">Email: {this.getEmail(user)}</div>
                                <div className="font-display mb-2">You have <b>{user.posts.length}</b> posts</div>
                            </div>
                        </div>
                        <div className="flex mb-3 border-purple-dark border-b-2">
                            <div className="flex w-1/4  h-12 font-bold text-purple mx-2 my-2 lg:mx-3 lg:my-3">
                            UserName
                            </div>
                            <div className="flex font-display text-purple w-3/4 h-auto mx-2 my-2 lg:mx-3 lg:my-3">
                            <form onSubmit={this.handleSubmit}>
                                <label>Type your New UserName Below:</label>
                                <div className="flex items-center">
                                <input className="flex appearance-none inline-block w-full text-purple-dark border border-purple-light rounded py-2 px-3 mb-3 leading-tight hover:shadow focus:outline-none focus:bg-white focus:border-purple" 
                                        type="text"
                                        value={this.state.newusername} 
                                        onChange={this.handleChange}/>
                                <button className="flex mb-3 ml-3 px-3 py-2 rounded font-semibold text-purple hover:text-white hover:bg-purple focus:outline-none" style={{borderColor:"#9F7AEA", borderWidth:"2px"}} type="submit">Submit</button>
                                </div>
                                <p className="text-grey-dark font-sans text-xs italic">Make it as long and as crazy as you'd like</p>
                            </form>
                            </div>
                        </div>
                        <div className="flex mb-3 border-purple border-b-1">
                            <div className="flex w-1/4 h-auto font-bold text-red-dark hover:text-red-light mx-2 my-2 lg:mx-3 lg:my-3">
                                <a className="mb-2" href={`http://localhost:3000/api/logout`} style={{color:"inherit", textDecoration:"none"}}>Log Out</a>
                            </div>
                            <div className="font-display text-purple w-3/4 h-auto mx-2 my-2 lg:mx-3 lg:my-3">Click to Sign Out from Octoreco</div>
                        </div>
                        <div className="flex mb-3 border-purple border-b-1">
                            <div className="flex w-1/4 h-auto mx-2 my-2 lg:mx-3 lg:my-3">
                                <button className="mb-2 font-bold text-red-dark text-base hover:text-red-light" onClick={() =>this.deleteConfirmed(user)}>Delete your account</button>
                            </div>
                            <div className="font-display font-bold text-red-dark w-3/4 h-auto mx-2 my-2 lg:mx-3 lg:my-3">**Warning**  Your account can not be recovered !</div>
                        </div>
                        <div className="flex mb-3">
                            <div className="flex w-1/4 h-12 font-bold text-grey mx-2 my-2 lg:mx-3 lg:my-3">
                            About Me
                            </div>
                            <div className="w-3/4 h-auto mx-2 my-2 lg:mx-3 lg:my-3">
                                <div className="font font-display text-purple mb-2">View my Webpage</div>
                                <div className="flex items-center font font-display text-purple mb-2">
                                <div className="flex">Contact Me: </div>
                                <a className="flex ml-2" href="mailto:wangxiaoxuan4869@gmail.com" style={{color:"inherit", textDecoration:"none"}}>
                                 <svg className="w-6 h-6 fill-current hover:w-8 h-8" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 382.117 382.117" >
                                <Mail />
                                </svg></a>
                                <a className="flex" href="https://twitter.com/messages/compose?recipient_id=wangxx1128" style={{color:"inherit", textDecoration:"none"}}><Twitter /></a>
                                <a className="flex" href="https://t.me/yszd320" style={{color:"inherit", textDecoration:"none"}}><Telegram /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>:null}
            </div>
        )
    }
}
function mapStateToProps(state){
    return { 
        user: state.auth
    };
  }

export default connect(mapStateToProps, actions)(Setting);
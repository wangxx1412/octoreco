import React, { Component } from 'react';
import {GooglePlus, Facebook, Home, Github, Mail} from '../assets/svg'

class Landing extends Component {
    render(){
        return (
          <div>
          <div className="lg:invisible absolute h-110screen lg:h-screen w-screen z-0" style={{backgroundColor:'#e9e9e9'}}></div>
          <div className="lg:flex relative z-10">
            <div className="flex items-start absolute z-20 w-full h-full lg:w-3/5 pt-3">
              <div className="absolute lg:pr-10 xxs:pr-2" style={{right:'0'}}>
              <a href="https://github.com/wangxx1412/octoreco"><Github /></a>
              <a href="mailto:wangxiaoxuan4869@gmail.com"><Mail /></a> 
              </div>
            </div>
            <div className="lg:flex lg:items-center bg-purple-dark relative lg:w-3/5 h-50screen lg:h-screen z-10">
              <div className="container xxs:pt-10 xs:pt-20 md:pt-32 lg:pt-0 lg:px-10">
                  <div className="font-bold text-4xl xs:text-5xl md:text-6xl text-grey-lightest">
                    Welcome to OctoReco!
                  </div>
                  <div className="text-grey-lightest">Share your moment!</div> 
                  <div className="text-xl lg:text-2xl font-bold text-grey-lightest underline xs:pt-4">
                  <a href="http://localhost:3000/posts" style={{color:"inherit", textDecoration:"none"}}>
                    View as Guest
                  </a>
                  </div>
              </div>
            </div>
            <div className="lg:flex relative w-full lg:w-2/5">
            <div className="relative  mx-0 h-60screen lg:h-screen lg:flex -mt-10 lg:-mt-0 lg:items-center">
              <div className="lg:container relative mx-auto px-2 md:px-4 lg:px-5 z-20">
                <div className="flex relative justify-center h-24rem bg-white flex-wrap z-20">
                  <p className="flex items-center w-5/6 font-display font-bold text-2xl text-purple-dark border-b-2 border-purple-lightest py-1 my-4">
                  Social Login
                  </p>
                  <button className="flex justify-center bg-red hover:bg-red-dark text-white border border-grey-light font-display font-bold mb-10 w-5/6 py-2 px-4 rounded">
                    <a className="flex items-center " href="http://localhost:3000/auth/google" style={{color:"inherit", textDecoration:"none"}}>
                      <GooglePlus />
                      <p>Sign in with Google</p>
                    </a>
                  </button>
                  <button className="flex items-center justify-center bg-blue hover:bg-blue-dark text-white border border-grey-light font-display font-bold mb-10 w-5/6 py-2 px-4 rounded">
                  <a className="flex items-center" href="http://localhost:3000/auth/facebook" style={{color:"inherit", textDecoration:"none"}}>
                    <Facebook />
                    <p>Sign in with Facebook</p>
                  </a>
                  </button>
                </div>
              </div>
            </div>
            <div className="xxs:invisible lg:visible flex items-end justify-center absolute w-full lg:h-full text-xs text-grey-light">
              <p className="block">Icons made by Freepik/Pixel Perfect from www.flaticon.com</p>
            </div>
            </div>
          </div>
          <div className="lg:invisible flex items-end lg:flex-none justify-center absolute w-full lg:w-0 lg:h-0">
          <p className="lg:-mt-6 text-xs text-grey">Icons made by Freepik/Pixel Perfect from www.flaticon.com</p>
          </div>
          </div>
          );
    }
};

export default Landing;
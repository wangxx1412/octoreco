import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class PostForm extends React.Component {
    render(){
        const { handleSubmit, showConfirm } = this.props;
      return (
        <form onSubmit={handleSubmit(this.props.onPostSubmit)} className="lg:ml-20">
          {showConfirm?
        null :
        <div>
        <hr className="w-full"/>
          <Field 
          className="bg-purple-lightest appearance-none border-2 rounded w-full lg:w-3/5 mt-2 py-2 px-4 text-grey-dark leading-tight focus:outline-none focus:bg-white focus:border-purple-dark"
          name="content" 
          component="textarea" 
          type='text' 
          placeholder="Say something for your post..."
          />
          <div className="w-full">
          <button className="shadow bg-red hover:bg-red-light focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-2">
          <Link to='/posts' style={{color:"inherit", textDecoration:"none"}}>Back</Link>
          </button>
          <button className="shadow bg-purple hover:bg-purple-light focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-2 ml-2" type='submit'>Next</button>
          </div>
        </div>
        }
        </form>
      );
    }
}

const validate = values => {
    const errors = {};
    if( !values.content) {
        errors.name = 'Must provide content.'
    }
    return errors;
  }

 const postForm = reduxForm({
        validate,
      form:'postForm'
  })(PostForm)

  export default connect(null, actions)(postForm);



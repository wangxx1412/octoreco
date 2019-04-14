import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class PostForm extends React.Component {
    
    render(){
        const { handleSubmit, showConfirm } = this.props;
      return (
        <form onSubmit={handleSubmit(this.props.onPostSubmit)}>
          {showConfirm?
        null :
        <div>
        <label>Say something for your post</label>  
        <Field 
        name="content" 
        component="textarea" 
        type='text' />
        <button>
        <Link to='/posts'>Back</Link>
        </button>
        <button type='submit'>Next</button>
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



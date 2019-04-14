import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import postReducer from './postReducer';
import authReducer from './authReducer';

export default combineReducers({
    form: reduxForm,
    posts: postReducer,
    auth: authReducer
});
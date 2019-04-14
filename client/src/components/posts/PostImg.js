import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { createBrowserHistory } from 'history';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class PostImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
          files: [],
          imagesPreviewUrls: []
        };
        this._handleSubmit = this._handleSubmit.bind(this);
      }
      
      _handleSubmit(e) {
        e.preventDefault();
        const { submitPost, formValues } = this.props;
        const history = createBrowserHistory({forceRefresh:true});
        submitPost(formValues.values, this.state.files, history);
      }
      
      _handleRemove = (id, i) => {
        this.setState(prevState =>({
          imagesPreviewUrls: prevState.imagesPreviewUrls.filter(el => el !== id),
          files: prevState.files.filter(el => el !== prevState.files[i])
        }));
      }

      checkMimeType=(e)=>{
        let files = e.target.files
        let err = [] 
        const types = [ 'image/jpeg']
        for(var x = 0; x<files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
            err[x] = files[x].type+' is not a supported format\n';
          }
        };
        for(var z = 0; z<err.length; z++) { 
            e.target.value = null 
            toast.error(err[z])
            return false;
        }
       return true;
    }

      checkFileSize=(e)=>{
        let files = e.target.files
        let size = 1500000 
        let err = []; 
        for(var x = 0; x<files.length; x++) {
        if (files[x].size > size) {
        err[x] = files[x].name +' is too large, please pick a smaller file\n';
        
        }
       };
        for(var z = 0; z<err.length; z++) {
        toast.error(err[z])
        e.target.value = null
        return false;
        }
        return true;
      }

      _handleImageChange = (e)=> {
        e.preventDefault(); 
        
        let files = Array.from( e.target.files);
        const typeOK = this.checkMimeType(e);
        const filesizeOK = this.checkFileSize(e);
        e.target.value = null;

        if((this.state.files.length < 3) && (filesizeOK === true) && (typeOK===true)){
          files.forEach((file) => {
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({    
                     files: [...this.state.files, file],
                     imagesPreviewUrls: [...this.state.imagesPreviewUrls, reader.result]
                });
            }
            reader.readAsDataURL(file);
        });
      }
      }
    
      render() { 
        const {showConfirm} = this.props;
        return (
          <div>
            <div className="form-group">
              <ToastContainer />
            </div>
            <form onSubmit= {this._handleSubmit}>
             {showConfirm ? 
             <div>
              <button 
              type="submit" 
              onClick={this._handleSubmit}
              >Post</button>
              <button type="button" onClick={this.props.onCancel}>
              Cancel
              </button>
             </div> : 
             <div>
             <label>
              Choose File
              <input className="upload" type="file" accept='image/*' style={{opacity:0}} onChange={this._handleImageChange} />
              </label>
              <div>
                <h2>
                  Please notice:
                </h2>
                <ul>
                  <li>
                    A single image file can't be larger than 1.5MB
                  </li>
                  <li>
                    You can only upload 3 images for one post
                  </li>
                  <li>
                    Only jpeg file accepted
                  </li>
                </ul>
              </div>
              <Image 
                delete={this._handleRemove} 
                imagesUrls={this.state.imagesPreviewUrls}
                files={this.state.files}
                />
             </div>         
            }
            </form>
          </div>
        )
      }
}

class Image extends Component {
  delete = (id, i) =>{
    this.props.delete(id,i);
  }

  render() {
    return (
      <div>
      {this.props.imagesUrls.map((imageUrl, i) => (
        
         <div key={'div'+i}> 
            <button 
            key={'btn'+i}
            type='button'
            onClick={()=>{
              this.delete(imageUrl, i)}
            } 
              >Remove</button>
            <img key={'img'+i} alt={i} src={imageUrl} />
        </div>
    ))}
    </div>
    );
  }

}

function mapStateToProps(state) {
  return { formValues: state.form.postForm };
}

export default connect(mapStateToProps, actions)(PostImg);
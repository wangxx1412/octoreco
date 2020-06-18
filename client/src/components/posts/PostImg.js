import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { createBrowserHistory } from "history";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class PostImg extends Component {
  state = {
    files: [],
    imagesPreviewUrls: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { submitPost, formValues } = this.props;
    const history = createBrowserHistory({ forceRefresh: true });
    submitPost(formValues.values, this.state.files, history);
  };

  handleRemove = (id, i) => {
    this.setState((prevState) => ({
      imagesPreviewUrls: prevState.imagesPreviewUrls.filter((el) => el !== id),
      files: prevState.files.filter((el) => el !== prevState.files[i]),
    }));
  };

  checkMimeType = (e) => {
    let files = e.target.files;
    let err = [];
    const types = ["image/jpeg"];
    for (var x = 0; x < files.length; x++) {
      if (types.every((type) => files[x].type !== type)) {
        err[x] = files[x].type + " is not a supported format\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      e.target.value = null;
      toast.error(err[z]);
      return false;
    }
    return true;
  };

  checkFileSize = (e) => {
    let files = e.target.files;
    let size = 1500000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].name + " is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z]);
      e.target.value = null;
      return false;
    }
    return true;
  };

  handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    const typeOK = this.checkMimeType(e);
    const filesizeOK = this.checkFileSize(e);
    e.target.value = null;

    if (this.state.files.length < 3 && filesizeOK === true && typeOK === true) {
      files.forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          this.setState({
            files: [...this.state.files, file],
            imagesPreviewUrls: [...this.state.imagesPreviewUrls, reader.result],
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  render() {
    const { showConfirm } = this.props;
    return (
      <div className="lg:ml-20">
        <div className="form-group">
          <ToastContainer />
        </div>
        <form onSubmit={this.handleSubmit}>
          {showConfirm ? (
            <div className="flex flex-wrap justify-center mt-5">
              <div className="flex justify-center font-bold w-3/5 text-2xl text-purple mb-5">
                <p className="flex">Ready to Post?</p>
              </div>
              <div className="flex justify-center w-3/5">
                <button
                  className="font-bold lg:text-xl text-grey-lightest mr-4 py-2 px-4 bg-purple hover:bg-purple-light rounded"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Post
                </button>
                <button
                  className="font-bold lg:text-xl text-grey-lightest py-2 px-4 bg-red hover:bg-red-light rounded"
                  type="button"
                  onClick={this.props.onCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div
                className="bg-orange-lightest border-l-4 border-orange text-orange-dark p-4"
                role="alert"
              >
                <p className="font-bold">Please notice:</p>
                <ul>
                  <li>A single image file can't be larger than 1.5MB</li>
                  <li>
                    You can only upload <b>3</b> images for one post
                  </li>
                  <li>
                    Only <b>jpeg</b> file accepted
                  </li>
                </ul>
              </div>
              <div className="flex justify-start items-center">
                <label className="flex mt-3 bg-purple-light border-2 border-purple rounded-lg">
                  <p className="flex mx-2 p-1 font-bold font-italic text-grey-lightest">
                    Choose Image Files
                  </p>
                  <input
                    className="upload"
                    type="file"
                    accept="image/jpeg"
                    style={{ opacity: 0 }}
                    onChange={this.handleImageChange}
                  />
                </label>
              </div>
              <Image
                delete={this.handleRemove}
                imagesUrls={this.state.imagesPreviewUrls}
                files={this.state.files}
              />
            </div>
          )}
        </form>
      </div>
    );
  }
}

class Image extends Component {
  delete = (id, i) => {
    this.props.delete(id, i);
  };

  render() {
    return (
      <div>
        {this.props.imagesUrls.map((imageUrl, i) => (
          <div key={imageUrl + i} className="my-2">
            <button
              className="text-red mr-2"
              key={imageUrl + i + " div"}
              type="button"
              onClick={() => {
                this.delete(imageUrl, i);
              }}
            >
              <FaTimes />
            </button>
            <img
              key={"img" + i}
              alt={"uploadImg: " + imageUrl + i}
              src={imageUrl}
              className="w-1/3 mr-3"
            />
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

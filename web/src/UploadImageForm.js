import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Field, reduxForm} from "redux-form";

const FileInput = ({className, multiple, input}) => (
    <input className={className}
           name={input.name}
           onChange={(event) => {
               console.dir(event.target);
               input.onChange(event.target.files)
           }}
           onBlur={input.onBlur}
           onFocus={input.onFocus}
           multiple={multiple}
           type="file"/>
);

const UploadImageForm = ({
                             currentDirectory,
                             uploadingImage,
                             handleSubmit
                         }) => (
    <form className="form-inline" onSubmit={handleSubmit}>
        <section className="form-group">
            <label htmlFor="image">Image</label>
            <Field name="image"
                   multiple
                   className="form-control-file"
                   component={FileInput} />
        </section>
        <section className="form-group">
            <label htmlFor="directory">Directory</label>
            <Field name="directory"
                   className="form-control"
                   component="input"
                   type="text" />
        </section>
        <section className="form-group">
            <label htmlFor="name">Name</label>
            <Field name="name"
                   className="form-control"
                   component="input"
                   type="text" />
        </section>
        <button type="submit" className="btn btn-primary">Upload</button>
    </form>
);

const mapStateToProps = (state) => {
    return {
        uploading: state.imageService.uploadingImage,
        currentDirectory: state.router.location.pathname.replace("/images", "")
    };
};

const UploadImageFormRedux = reduxForm({
    form: "uploadImage"
})(UploadImageForm);

export default withRouter(connect(mapStateToProps, null)(UploadImageFormRedux));
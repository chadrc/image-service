import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Field, reduxForm} from "redux-form";
import FileInput from "./FileInput";

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
                   placeholder={currentDirectory}
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

const UploadImageFormRedux = withRouter(connect(mapStateToProps, null)(reduxForm({
    form: "uploadImage"
})(UploadImageForm)));

export default UploadImageFormRedux;
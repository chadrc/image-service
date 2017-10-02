import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Field, reduxForm} from "redux-form";
import FileInput from "./FileInput";

const UploadImageForm = ({
                             currentDirectory,
                             selectedImageName,
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
                   placeholder={selectedImageName}
                   type="text" />
        </section>
        <button type="submit" className="btn btn-primary">Upload</button>
    </form>
);

const mapStateToProps = (state) => {
    let images = state.form.uploadImage && state.form.uploadImage.values ?
        state.form.uploadImage.values.image : null;
    let image = images && images.length > 0 ? images[0].name : null;
    return {
        uploading: state.imageService.uploadingImage,
        currentDirectory: state.router.location.pathname.replace("/images", ""),
        selectedImageName: image
    };
};

const mapDispatchToProps = (dispatch, {location}) => {
    return {
        onSubmit: (values) => {
            if (!values.directory && values !== "") {
                values.directory = location.pathname.replace("/images", "");
            }
            dispatch({
                type: "UPLOAD_IMAGE",
                values: values
            });
        }
    };
};

const UploadImageFormRedux = withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: "uploadImage"
})(UploadImageForm)));

export default UploadImageFormRedux;
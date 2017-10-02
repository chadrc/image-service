import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import FormContainer from "./Forms";

const UploadImageForm = ({
                             currentDirectory,
                             uploadingImage
                         }) => (
    <FormContainer className="form-inline"
                   actionType="UPLOAD_IMAGE"
                   actionSuccess={() => console.log("success")}
                   actionFailure={() => console.log("failure")}>
        <section className="form-group">
            <label htmlFor="image">Image</label>
            <input id="image"
                   className="form-control-file"
                   name="image"
                   type="file"
                   disabled={uploadingImage}
                   required={true}/>
        </section>
        <section className="form-group">
            <label htmlFor="directory">Directory</label>
            <input id="directory"
                   className="form-control"
                   name="directory"
                   disabled={uploadingImage}
                   defaultValue={currentDirectory}/>
        </section>
        <section className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control"
                   id="name"
                   name="name"
                   disabled={uploadingImage}/>
        </section>
        <button type="submit" className="btn btn-primary">Upload</button>
    </FormContainer>
);

const mapStateToProps = (state) => {
    return {
        uploading: state.imageService.uploadingImage,
        currentDirectory: state.router.location.pathname.replace("/images", "")
    };
};

export default withRouter(connect(mapStateToProps, null)(UploadImageForm));
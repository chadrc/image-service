import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import FormContainer from "./Forms";

const UploadImageForm = ({
                             currentDirectory
                         }) => (
    <FormContainer className="form-inline"
                   actionType="UPLOAD_IMAGE"
                   actionSuccess={() => console.log("success")}
                   actionFailure={() => console.log("failure")}>
        <section className="form-group">
            <label htmlFor="image">Image</label>
            <input id="image" name="image" type="file" className="form-control-file" required={true}/>
        </section>
        <section className="form-group">
            <label htmlFor="directory">Directory</label>
            <input className="form-control" id="directory" name="directory" placeholder={currentDirectory}/>
        </section>
        <section className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control" id="name" name="name"/>
        </section>
        <button type="submit" className="btn btn-primary">Upload</button>
    </FormContainer>
);

const mapStateToProps = (state) => {
    return {
        currentDirectory: state.router.location.pathname.replace("/images", "")
    };
};

export default withRouter(connect(mapStateToProps, null)(UploadImageForm));
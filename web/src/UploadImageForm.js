import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Field, reduxForm} from 'redux-form';

const UploadImageForm = ({
    currentDirectory,
    handleSubmit
}) => (
    <form className="form-inline">
        <section className="form-group">
            <label htmlFor="image">Image</label>
            <input id="image" name="image" type="file" className="form-control-file" required={true}/>
        </section>
        <section className="form-group">
            <label htmlFor="directory">Directory</label>
            <Field className="form-control"
                   name="directory"
                   component="input"
                   placeholder={currentDirectory}
                   type="text"/>
        </section>
        <section className="form-group">
            <label htmlFor="name">Name</label>
            <Field className="form-control" name="name" component="input" type="text"/>
        </section>
        <button type="submit" className="btn btn-primary">Upload</button>
    </form>
);

const UploadImageReduxForm = reduxForm({
    form: 'uploadImage'
})(UploadImageForm);

const mapStateToProps = (state) => {
    console.log('map state');
    return {
        currentDirectory: state.router.location.pathname,
        initialValues: {

        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadImageReduxForm));
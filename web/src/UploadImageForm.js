import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const UploadImageForm = ({
    currentDirectory,
    handleSubmit,
    formRef
}) => (
    <form className="form-inline" onSubmit={handleSubmit} ref={(form) => formRef(form)}>
        <section className="form-group">
            <label htmlFor="image">Image</label>
            <input id="image" name="image" type="file" className="form-control-file" required={true}/>
        </section>
        <section className="form-group">
            <label htmlFor="directory">Directory</label>
            <input className="form-control" id="directory" name="directory" placeholder={currentDirectory} />
        </section>
        <section className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control" id="name" name="name" />
        </section>
        <button type="submit" className="btn btn-primary">Upload</button>
    </form>
);

class UploadImageFormContainer extends React.Component {

    formRef(form) {
        this.form = form;
    }

    submit(event) {
        event.stopPropagation();
        event.preventDefault();

        if (this.props.onSubmit) {
            this.props.onSubmit(new FormData(this.form));
        }
    }

    render() {
        return <UploadImageForm {...this.props}
                                formRef={(form) => this.formRef(form)}
                                handleSubmit={(event) => this.submit(event)} />
    }
}

const mapStateToProps = (state) => {
    return {
        currentDirectory: state.router.location.pathname.replace("/images", ""),
        initialValues: {

        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (data) => {
            dispatch({
                type: "UPLOAD_IMAGE",
                data: data
            });
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadImageFormContainer));
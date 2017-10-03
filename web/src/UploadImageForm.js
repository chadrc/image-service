import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Field, FieldArray, reduxForm} from "redux-form";
import FileInput from "./FileInput";

const fileMembers = ({
    currentDirectory,
    fields,
    reset
}) => {
    let fieldComps = fields.map((file, index) => {
        let fileData = fields.get(index);
        return <section className="form-row mb-2" key={`memberField-${index}`}>
            <section className="col" key="image">
                <Field name={`${file}.image`}
                       component={FileInput} />
            </section>
            <section className="col" key="directory">
                <Field name={`${file}.directory`}
                       className="form-control"
                       component="input"
                       placeholder={currentDirectory}
                       type="text" />
            </section>
            <section className="col" key="name">
                <Field name={`${file}.name`}
                       className="form-control"
                       component="input"
                       placeholder={fileData.image ? fileData.image.name : null}
                       type="text" />
            </section>
            {fields.length > 1 ?
                <button type="button"
                        className="btn btn-outline-danger"
                        onClick={() => {
                            if (fields.length > 1) {
                                fields.remove(index);
                            }
                        }}>
                    &times;
                </button>
            : ""}
        </section>
    });
    return [
        <section key="buttons" className="form-row mb-2 d-flex justify-content-center">
            <button type="button"
                    className="btn btn-outline-primary col-sm-3 mr-1"
                    onClick={(event) => {
                        let inputChild = event.target.children[0];
                        if (inputChild) {
                            inputChild.click();
                        }
                    }}>
                <input type="file"
                       multiple
                       style={{display: "none"}}
                       onChange={(event) => {
                           let files = event.target.files;
                           if (files && files.length > 0) {
                               for (let file of files) {
                                   fields.push({
                                       image: file
                                   });
                               }
                           }
                       }}/>
                Add
            </button>
            <button type="button"
                    className="btn btn-outline-warning col-sm-3 ml-1"
                    onClick={reset}>
                Clear
            </button>
        </section>,
        ...fieldComps
    ]
};

const UploadImageForm = ({
                             currentDirectory,
                             selectedImageName,
                             uploadingImage,
                             handleSubmit,
                             reset
                         }) => (
    <form onSubmit={handleSubmit}>
        <FieldArray name="members"
                    reset={reset}
                    currentDirectory={currentDirectory}
                    component={fileMembers} />
    </form>
);

const mapStateToProps = (state) => {
    let image = state.form.uploadImage && state.form.uploadImage.values ?
        state.form.uploadImage.values.image : null;
    let name = image ? image.name : null;
    return {
        uploading: state.imageService.uploadingImage,
        currentDirectory: state.router.location.pathname.replace("/images", ""),
        selectedImageName: name,
        initialValues: {
            members: [
                {}
            ]
        }
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
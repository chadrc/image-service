import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Field, FieldArray, reduxForm} from "redux-form";
import FileInput from "./FileInput";

const fileMembers = ({
    currentDirectory,
    fields,
    reset,
    handleSubmit
}) => {
    let fieldComps = fields.map((file, index) => {
        let fileData = fields.get(index);
        return (
            <section className="form-row mb-2" key={`memberField-${index}`}>
                <section className="align-items-center justify-content-center d-flex" key="image">
                    <Field name={`${file}.image`}
                           className="mb-0"
                           component={FileInput} />
                </section>
                <section className="col align-items-center d-flex" key="directory">
                    <Field name={`${file}.directory`}
                           className="form-control"
                           component="input"
                           placeholder={currentDirectory}
                           type="text" />
                </section>
                <section className="col align-items-center d-flex" key="name">
                    <Field name={`${file}.name`}
                           className="form-control"
                           component="input"
                           placeholder={fileData.image ? fileData.image.name : null}
                           type="text" />
                </section>
                {fields.length > 1 ?
                    <section className="align-items-center justify-content-center d-flex">
                        <button type="button"
                                className="btn btn-outline-danger"
                                onClick={() => {
                                    if (fields.length > 1) {
                                        fields.remove(index);
                                    }
                                }}>
                            &times;
                        </button>
                    </section>
                : ""}
            </section>
        )
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
                    className="btn btn-outline-warning col-sm-3 ml-1 mr-1"
                    onClick={reset}>
                Clear
            </button>
            <button type="button"
                    className="btn btn-outline-success col-sm-3 ml-1"
                    onClick={handleSubmit}>
                Submit
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
                    handleSubmit={handleSubmit}
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
        onSubmit: (value) => {
            let images = value.members.map((image) => {
                if (!image.directory && image !== "") {
                    image.directory = location.pathname.replace("/images", "");
                }
                return image;
            });
            dispatch({
                type: "UPLOAD_IMAGES",
                images: images
            });
        }
    };
};

const UploadImageFormRedux = withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: "uploadImage"
})(UploadImageForm)));

export default UploadImageFormRedux;
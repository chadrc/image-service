import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {fetchDirInfoAction} from "../Actions";
import LocationNav from "../LocationNav";
import ImageEditView from "./ImageEditView";
import ImagesTable from "./ImagesTable";
import UploadImageForm from "../UploadImageForm";
import {elary} from "../Utils";

const ImagesView = ({
                        dirInfo,
                        onItemClicked,
                        onUploadImageSubmit,
                        onAddFolderSubmit,
                        onDirectorySelected,
                        onBackButtonClicked,
                        match,
                        location,
                        breadCrumbs
                    }) => (
    <section>
        <section className="d-flex justify-content-between">
            <LocationNav/>
            {dirInfo.directory ? (
                <div>
                    <button type="button"
                            className="btn btn-primary mb-2 mr-2"
                            data-toggle="collapse"
                            data-target="#uploadImageCollapse">
                        Upload Image
                    </button>
                    <button type="button"
                            className="btn btn-primary mb-2"
                            data-toggle="collapse"
                            data-target="#addFolderModal">
                        Add Folder
                    </button>
                </div>
            ) : ""}
        </section>

        {dirInfo.directory ? elary([
                <section key="uploadImageCollapse" className="collapse mb-2" id="uploadImageCollapse">
                    <UploadImageForm onSubmit={onUploadImageSubmit}/>
                </section>,
                <ImagesTable key="imagesTable" dirInfo={dirInfo} basePath={match.path}/>
            ])
            :
            <ImageEditView image={dirInfo}/>
        }
    </section>
);

class ImagesViewContainer extends React.Component {
    componentDidMount() {
        this.props.fetchDir(this.props.location.pathname);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.location.pathname !== newProps.location.pathname) {
            this.props.fetchDir(newProps.location.pathname);
        }
    }

    render() {
        return <ImagesView {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        dirInfo: state.imageService.dirInfo
    }
};

const mapDispatchToProps = (dispatch, {match}) => {
    return {
        fetchDir: (path) => {
            let apiPath = path.replace(match.path, "");
            if (apiPath.startsWith("/")) {
                apiPath = apiPath.slice(1);
            }
            if (apiPath.endsWith("/")) {
                apiPath = apiPath.slice(0, apiPath.length - 1);
            }
            dispatch(fetchDirInfoAction(apiPath));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImagesViewContainer));

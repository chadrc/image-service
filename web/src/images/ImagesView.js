import React from 'react';
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import {fetchDirInfoAction} from "../Actions";
import LocationNav from "../LocationNav";
import ImageEditView from "./ImageEditView";
import ImagesTable from "./ImagesTable";
import UploadImageForm from "../UploadImageForm";


const ImagesView = ({
                        dirInfo,
                        onItemClicked,
                        onAddFolderSubmit,
                        onDirectorySelected,
                        onBackButtonClicked,
                        match,
                        location,
                        breadCrumbs,
                        uploading
                    }) => (
    <section>
        <section className="d-flex">
            <LocationNav/>
            {location.hash !== "#upload" && dirInfo.directory ? (
                <nav className="breadcrumb ml-2">
                    <Link className="breadcrumb-item"
                          to={location.pathname + "#upload"}>
                        Upload
                    </Link>
                </nav>
            ) : ""}
        </section>

        {dirInfo.directory ?
            (uploading ?
                    <UploadImageForm/>
                    :
                    <ImagesTable key="imagesTable" dirInfo={dirInfo} basePath={match.path}/>
            )
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
        let uploading = false;
        if (this.props.location.hash === "#upload") {
            uploading = true;
        }
        return <ImagesView {...this.props} uploading={uploading}/>
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

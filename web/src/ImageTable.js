import React from 'react';
import Globals from "./Globals";
import UploadImageModal from "./UploadImageModal";
import AddFolderModal from "./AddFolderModal";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import {fetchDirInfoAction} from "./Actions";

const ImageTable = (
    {
        dirInfo,
        onItemClicked,
        onUploadImageSubmit,
        onAddFolderSubmit,
        onDirectorySelected,
        onBackButtonClicked,
        match
    }) => (
    <section>
        <section className="d-flex justify-content-between">
            <div>
                {dirInfo.name && dirInfo.name !== "/" ?
                    <Link to={`${match.url}${dirInfo.path.replace(dirInfo.name, "")}`}>
                        {dirInfo.name}
                    </Link>
                    : ""}
            </div>
            <div>
                <button type="button" className="btn btn-primary mb-2 mr-2" data-toggle="modal"
                        data-target="#uploadImageModal">
                    Upload Image
                </button>
                <button type="button" className="btn btn-primary mb-2" data-toggle="modal"
                        data-target="#addFolderModal">
                    Add Folder
                </button>
            </div>
        </section>
        <AddFolderModal onSubmit={(event) => onAddFolderSubmit(event)}/>
        <UploadImageModal onSubmit={(event) => onUploadImageSubmit(event)}/>
        <table className="table">
            <thead>
            <tr>
                <th className="text-center">Image</th>
                <th>Path ({(dirInfo.name || "") + "/"})</th>
                <th className="text-center">Size (MB)</th>
                <th className="text-center">Focal Points</th>
            </tr>
            </thead>
            <tbody>
            {dirInfo.items.map((item) => {
                return (
                    <tr key={item.name}>
                        <td>
                            {item.directory ? "" :
                                <img alt="" className="mx-auto d-block"
                                     src={`${Globals.ImageUrl}/${item.path}${item.name}?width=100`}/>}
                        </td>
                        <td>
                                {item.directory ? (
                                    <Link to={`${match.url}/${item.path}${item.name}`}>
                                        {item.name}/
                                    </Link>
                                ) : item.name}
                        </td>
                        <td className="text-center">
                            {item.directory ? "" : (item.size / 1000000).toFixed(2)}
                            </td>
                        <td className="text-center">
                            {item.directory && item.focalPoints ? item.focalPoints.map((point, index) => {
                                return (
                                    <span key={item.name + "fp" + index}>
                                        {`(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`}
                                    </span>
                                );
                            }) : ""}
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    </section>
);

class ImageTableContainer extends React.Component {
    componentWillReceiveProps(newProps) {
        if (this.props.location.pathname !== newProps.location.pathname) {
            this.props.fetchDir(newProps.location.pathname);
        }
    }

    render() {
        return <ImageTable {...this.props} />
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
            console.log(apiPath);
            dispatch(fetchDirInfoAction(apiPath));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageTableContainer));

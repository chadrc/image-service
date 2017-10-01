import React from 'react';
import Globals from "./Globals";
import UploadImageModal from "./UploadImageModal";
import AddFolderModal from "./AddFolderModal";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {fetchDirInfoAction} from "./Actions";

const ImageTable = (
    {
        dirInfo,
        onItemClicked,
        onUploadImageSubmit,
        onAddFolderSubmit,
        onDirectorySelected,
        onBackButtonClicked
    }) => (
    <section>
        <section className="d-flex justify-content-between">
            <div>
                {dirInfo.name && dirInfo.name !== "/" ?
                    <button type="button" className="btn btn-secondary mb-2"
                            onClick={() => onBackButtonClicked(dirInfo)}>
                        Back
                    </button>
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
                    <tr key={item.name} onClick={() => {
                        if (item.directory) {
                            onDirectorySelected(item)
                        } else {
                            onItemClicked(item)
                        }
                    }}>
                        <td>
                            {item.directory ? "" :
                                <img alt="" className="mx-auto d-block"
                                     src={`${Globals.ImageUrl}/${item.path}${item.name}?width=100`}/>}
                        </td>
                        <td>
                            {item.directory ? item.name + "/" : item.name}
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
            this.props.fetchDir(newProps.location.pathname, this.props.match);
        }
    }

    render() {
        return React.createElement(ImageTable, this.props);
    }
}

const mapStateToProps = (state) => {
    return {
        dirInfo: state.imageService.dirInfo
    }
};

const mapDispatchToProps = (dispatch, {match, history}) => {
    return {
        fetchDir: (path) => {
            let apiPath = path.replace(match.path, "");
            dispatch(fetchDirInfoAction(apiPath));
        },
        onBackButtonClicked: (dirInfo) => {
            let previousDir = dirInfo.path.replace(`/${dirInfo.name}`, "");
            if (previousDir.startsWith("/")) {
                previousDir = previousDir.slice(1);
            }
            history.push(match.path + previousDir);
        },
        onDirectorySelected: (dirInfo) => {
            let dir = dirInfo.path + dirInfo.name;
            history.push(match.path + dir);
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageTableContainer));

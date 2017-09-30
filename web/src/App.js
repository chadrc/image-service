import React, {Component} from 'react';
import 'bootstrap-v4-dev/dist/css/bootstrap.css';
import 'bootstrap-v4-dev/dist/js/bootstrap.js';
import * as $ from 'jquery';
import './styles.css';
import Globals from "./Globals";
import ImageEditView from "./ImageEditView";
import ImageTable from "./ImageTable";
import {connect} from "react-redux";
import {fetchDirInfoAction} from "./Actions";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImage: null
        };
    }

    onUploadImageSubmit(event) {
        event.stopPropagation();
        event.preventDefault();

        let data = new FormData(event.target);

        fetch(`${Globals.ApiUrl}/image`, {
            method: 'post',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        }).then((response) => {
            return response.text();
        }).then((data) => {

        });
        return false;
    }

    onAddFolderSubmit(event) {
        event.stopPropagation();
        event.preventDefault();

        let data = new FormData(event.target);

        fetch(`${Globals.ApiUrl}/folder`, {
            method: 'post',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        }).then((response) => {
            return response.text();
        }).then((data) => {
            console.log(data);
        });
        return false;
    }

    onEditImageSubmit(event) {
        event.stopPropagation();
        event.preventDefault();
        return false;
    }

    onImageClicked(image) {
        this.setState({
            selectedImage: image
        });

        $('#imageEditModal').modal();
    }

    onBackButtonClicked() {
        this.setState({
            selectedImage: null
        });
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <h1>Images Service</h1>
                    {this.state.selectedImage ? (
                        <ImageEditView image={this.state.selectedImage}
                                       onSubmit={(event) => this.onEditImageSubmit(event)}
                                       onBackButtonClicked={() => this.onBackButtonClicked()}/>
                    ) : (
                        <ImageTable rootDir={this.props.dirInfo}
                                    onBackButtonClicked={() => this.props.onTableBackButtonClicked(this.props.dirInfo)}
                                    onDirectorySelected={(directory) => this.props.onDirectorySelected(directory)}
                                    onUploadImageSubmit={(event) => this.onUploadImageSubmit(event)}
                                    onAddFolderSubmit={(event) => this.onAddFolderSubmit(event)}
                                    onItemClicked={(item) => this.onImageClicked(item)}/>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dirInfo: state.imageApi.dirInfo
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTableBackButtonClicked: (dirInfo) => {
            let previousDir = dirInfo.path.replace(`/${dirInfo.name}`, "");
            if (previousDir.startsWith("/")) {
                previousDir = previousDir.slice(1);
            }
            dispatch(fetchDirInfoAction(previousDir));
        },
        onDirectorySelected: (dirInfo) => {
            dispatch(fetchDirInfoAction(dirInfo.path + dirInfo.name));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

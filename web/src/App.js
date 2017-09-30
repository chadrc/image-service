import React, {Component} from 'react';
import 'bootstrap-v4-dev/dist/css/bootstrap.css';
import 'bootstrap-v4-dev/dist/js/bootstrap.js';
import * as $ from 'jquery';
import './styles.css';
import Globals from "./Globals";
import ImageEditView from "./ImageEditView";
import ImageTable from "./ImageTable";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageInfo: {
                items: []
            },
            selectedImage: null
        };

        this.fetchImageData("");
    }

    fetchImageData(path) {
        fetch(`${Globals.ApiUrl}/m/${path}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json())
            .then((data) => {
                this.setState({
                    imageInfo: data
                });
            });
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

    onDirectorySelected(directory) {
        this.fetchImageData(directory.path + directory.name);
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
                        <ImageTable rootDir={this.state.imageInfo}
                                    onDirectorySelected={(directory) => this.onDirectorySelected(directory)}
                                    onUploadImageSubmit={(event) => this.onUploadImageSubmit(event)}
                                    onAddFolderSubmit={(event) => this.onAddFolderSubmit(event)}
                                    onItemClicked={(item) => this.onImageClicked(item)}/>
                    )}
                </div>
            </div>
        );
    }
}

export default App;

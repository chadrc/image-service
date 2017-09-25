import React, {Component} from 'react';
import 'bootstrap-v4-dev/dist/css/bootstrap.css';
import 'bootstrap-v4-dev/dist/js/bootstrap.js';
import * as $ from 'jquery';
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

    onSubmit(event) {
        event.stopPropagation();
        event.preventDefault();

        let data = new FormData(event.target);
        console.log(data);
        console.dir(event.target);

        fetch(`${Globals.ApiUrl}/image`, {
            method: 'post',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        }).then((response) => {
            console.log(response);
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
                        <ImageEditView id="imageEditModal"
                                       image={this.state.selectedImage}
                                       onSubmit={(event) => this.onEditImageSubmit(event)}
                                       onBackButtonClicked={() => this.onBackButtonClicked()}/>
                    ) : (
                        <ImageTable rootDir={this.state.imageInfo}
                                    onUploadImageSubmit={(event) => this.onSubmit(event)}
                                    onItemClicked={(item) => this.onImageClicked(item)}/>
                    )}
                </div>
            </div>
        );
    }
}

export default App;

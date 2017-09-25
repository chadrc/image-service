import React, {Component} from 'react';
import 'bootstrap-v4-dev/dist/css/bootstrap.css';
import 'bootstrap-v4-dev/dist/js/bootstrap.js';
import * as $ from 'jquery';
import Globals from "./Globals";
import ImageEditModal from "./ImageEditModal";
import UploadImageModal from "./UploadImageModal";
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

    render() {
        return (
            <div className="App">
                <div className="container">
                    <h1>Images Service</h1>
                    <button type="button" className="btn btn-primary mb-2" data-toggle="modal" data-target="#uploadImageModal">
                        Upload Image
                    </button>
                    <UploadImageModal onSubmit={(event) => this.onSubmit(event)}/>
                    <ImageEditModal id="imageEditModal"
                                    image={this.state.selectedImage}
                                    onSubmit={(event) => this.onEditImageSubmit(event)} />
                    <ImageTable rootDir={this.state.imageInfo}
                                onItemClicked={(item) => this.onImageClicked(item)}/>
                </div>
            </div>
        );
    }
}

export default App;

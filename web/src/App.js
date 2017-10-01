import React, {Component} from 'react';
import 'bootstrap-v4-dev/dist/css/bootstrap.css';
import 'bootstrap-v4-dev/dist/js/bootstrap.js';
import * as $ from 'jquery';
import './styles.css';
import Globals from "./Globals";
import ImageEditView from "./ImageEditView";
import ImageTable from "./ImageTable";
import {connect} from "react-redux";
import {withRouter, Redirect, Route} from "react-router-dom";
import Dashboard from './Dashboard';

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
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/images" component={ImageTable} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

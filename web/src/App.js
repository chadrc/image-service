import React, {Component} from 'react';
import 'bootstrap-v4-dev/dist/css/bootstrap.css';
import 'bootstrap-v4-dev/dist/js/bootstrap.js';

const apiUrl = "http://localhost:8080";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageInfo: {
                items: []
            }
        };

        this.fetchImageData("");
    }

    fetchImageData(path) {
        fetch(`${apiUrl}/m/${path}`, {
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

        fetch(`${apiUrl}/image`, {
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

    render() {
        return (
            <div className="App">
                <div className="container">
                    <h1>Images Service</h1>
                    <button type="button" className="btn btn-primary mb-2" data-toggle="modal" data-target="#uploadImageModal">
                        Upload Image
                    </button>
                    <div id="uploadImageModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="uploadImageModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="uploadImageModalLabel">Upload Image</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(event) => this.onSubmit(event)}>
                                        <section className="form-group">
                                            <label htmlFor="image">Image</label>
                                            <input id="image" name="image" type="file" className="form-control-file" required={true} />
                                        </section>
                                        <button type="submit" className="btn btn-primary">Upload</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Image</th>
                                <th>Path ({this.state.imageInfo.name})</th>
                                <th className="text-center">Size</th>
                                <th className="text-center">Focal Points</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.imageInfo.items.map((item) => {
                            return (
                                <tr key={item.name}>
                                    <td>
                                        <img className="mx-auto d-block" src={`${apiUrl}/i/${item.name}?width=100`} />
                                    </td>
                                    <td>{item.name}</td>
                                    <td className="text-center">{item.size}</td>
                                    <td className="text-center">
                                        {item.focalPoints.map((point, index) => {
                                            return (
                                                <span key={item.name + "fp" + index}>{`(${point.x}, ${point.y})`}</span>
                                            )
                                        })}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default App;

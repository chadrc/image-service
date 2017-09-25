import React, {Component} from 'react';

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
                    <h4>Images Service</h4>
                    <form onSubmit={(event) => this.onSubmit(event)}>
                        <section className="form-group">
                            <label htmlFor="image">Image</label>
                            <input id="image" name="image" type="file" className="form-control-file" required={true} />
                        </section>
                        <button type="submit" className="btn btn-primary">Upload</button>
                    </form>
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
                                <tr>
                                    <td>
                                        <img className="mx-auto d-block" src={`${apiUrl}/i/${item.name}?width=100`} />
                                    </td>
                                    <td>{item.name}</td>
                                    <td className="text-center">{item.size}</td>
                                    <td className="text-center">
                                        {item.focalPoints.map((item) => {
                                            return (
                                                <span>{`(${item.x}, ${item.y})`}</span>
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

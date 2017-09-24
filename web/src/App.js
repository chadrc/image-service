import React, {Component} from 'react';

const apiUrl = "http://localhost:8080";

class App extends Component {
    constructor(props) {
        super(props);
        fetch(`${apiUrl}/m/`, {
            method: 'get',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json())
        .then((data) => {
            console.log(data);
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
                    <img src={apiUrl + "/i/mocha-focus-with-chai.jpg?height=500"} />

                    <img src={apiUrl + "/i/mocha-focus-with-chai.jpg?width=500"} />

                    <img src={apiUrl + "/i/chai-focus-with-mocha.jpg?aspect=1&height=500"} />
                </div>
            </div>
        );
    }
}

export default App;

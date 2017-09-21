import React, {Component} from 'react';

const apiUrl = "http://localhost:8080";

class App extends Component {
    onSubmit(event) {
        event.stopPropagation();
        event.preventDefault();
        let data = new FormData(event.target);
        console.log(data);
        console.dir(event.target);

        fetch(`${apiUrl}/image`, {
            mode: 'no-cors',
            method: 'post',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
        })
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
                </div>
            </div>
        );
    }
}

export default App;

import React from 'react';

export default ({image, onSubmit, onBackButtonClicked}) => (
    <div>
        <button type="button" className="btn btn-info mb-2" onClick={() => onBackButtonClicked()}>
            Back
        </button>
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Edit Image</h3>
            </div>
            <div className="card-block">
                <form onSubmit={(event) => onSubmit(event)}>
                    <section className="form-group">
                        <label htmlFor="imageName">Name</label>
                        <input id="imageName" name="name" className="form-control-file" />
                    </section>
                    <button type="button" className="btn btn-primary">Save</button>
                </form>
            </div>
        </div>
    </div>
);
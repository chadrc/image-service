import React from 'react';
import Globals from './Globals';

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
                <div className="row">
                    <div className="col-sm-3">
                        <form onSubmit={(event) => onSubmit(event)}>
                            <section className="form-group">
                                <label htmlFor="imageName">Name</label>
                                <input id="imageName" name="name" className="form-control-file" />
                            </section>
                            <div className="form-group">
                                <label>Size</label>
                                <div>
                                    <p className="form-control-static">{image.size}</p>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                    <div className="col-sm-9">
                        <img className="w-100" src={`${Globals.ImageUrl}/${image.name}`} />
                    </div>
                </div>
            </div>
        </div>
    </div>
);
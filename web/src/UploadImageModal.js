import React from 'react';

export default ({onSubmit}) => (
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
                    <form onSubmit={(event) => onSubmit(event)}>
                        <section className="form-group">
                            <label htmlFor="image">Image</label>
                            <input id="image" name="image" type="file" className="form-control-file" required={true} />
                        </section>
                        <section className="form-group">
                            <label htmlFor="directory">Directory</label>
                            <input id="directory" name="directory" type="text" className="form-control" />
                        </section>
                        <section className="form-group">
                            <label htmlFor="name">Name</label>
                            <input id="name" name="name" type="text" className="form-control" />
                        </section>
                        <button type="submit" className="btn btn-primary">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
);

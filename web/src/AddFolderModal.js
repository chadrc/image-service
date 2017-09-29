import React from 'react';

export default ({onSubmit}) => (
    <div id="addFolderModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="addFolderModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title" id="addFolderModalLabel">Add Folder</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={(event) => onSubmit(event)}>
                        <section className="form-group">
                            <label htmlFor="name">Name</label>
                            <input id="name" name="name" type="text" className="form-control" required={true} />
                        </section>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
);
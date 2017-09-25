import React from 'react';

export default ({image, onSubmit, id}) => (
    <div id={id}
         className="modal fade"
         tabIndex="-1"
         role="dialog"
         aria-labelledby="imageEditModalLabel"
         aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title" id="imageEditModalLabel">Edit Image</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
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
    </div>
);
import React from 'react';
import Globals from "./Globals";
import UploadImageModal from "./UploadImageModal";
import AddFolderModal from "./AddFolderModal";

export default ({rootDir, onItemClicked, onUploadImageSubmit, onAddFolderSubmit, onDirectorySelected, onBackButtonClicked}) => (
    <section>
        <section className="d-flex justify-content-between">
            <div>
                {rootDir.name && rootDir.name !== "/" ?
                    <button type="button" className="btn btn-secondary mb-2" onClick={() => onBackButtonClicked()}>
                        Back
                    </button>
                    : ""}
            </div>
            <div>
                <button type="button" className="btn btn-primary mb-2 mr-2" data-toggle="modal" data-target="#uploadImageModal">
                    Upload Image
                </button>
                <button type="button" className="btn btn-primary mb-2" data-toggle="modal" data-target="#addFolderModal">
                    Add Folder
                </button>
            </div>
        </section>
        <AddFolderModal onSubmit={(event) => onAddFolderSubmit(event)}/>
        <UploadImageModal onSubmit={(event) => onUploadImageSubmit(event)}/>
        <table className="table">
            <thead>
            <tr>
                <th className="text-center">Image</th>
                <th>Path ({(rootDir.name || "") + "/"})</th>
                <th className="text-center">Size (MB)</th>
                <th className="text-center">Focal Points</th>
            </tr>
            </thead>
            <tbody>
            {rootDir.items.map((item) => {
                return (
                    <tr key={item.name} onClick={() => {
                        if (item.directory) {
                            onDirectorySelected(item)
                        } else {
                            onItemClicked(item)
                        }
                    }}>
                        <td>
                            {item.directory ? "" :
                                <img alt="" className="mx-auto d-block" src={`${Globals.ImageUrl}/${item.path}${item.name}?width=100`} />}
                        </td>
                        <td>{item.directory ? item.name + "/" : item.name}</td>
                        <td className="text-center">{item.directory ? "" : (item.size / 1000000).toFixed(2)}</td>
                        <td className="text-center">
                            {item.focalPoints ? item.focalPoints.map((point, index) => {
                                return (
                                    <span key={item.name + "fp" + index}>{`(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`}</span>
                                );
                            }) : ""}
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    </section>
);

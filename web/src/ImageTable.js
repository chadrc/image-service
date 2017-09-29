import React from 'react';
import Globals from "./Globals";
import UploadImageModal from "./UploadImageModal";
import AddFolderModal from "./AddFolderModal";

export default ({rootDir, onItemClicked, onUploadImageSubmit, onAddFolderSubmit, onDirectorySelected}) => (
    <div>
        <button type="button" className="btn btn-primary mb-2 mr-2" data-toggle="modal" data-target="#uploadImageModal">
            Upload Image
        </button>
        <button type="button" className="btn btn-primary mb-2" data-toggle="modal" data-target="#addFolderModal">
            Add Folder
        </button>
        <AddFolderModal onSubmit={(event) => onAddFolderSubmit(event)}/>
        <UploadImageModal onSubmit={(event) => onUploadImageSubmit(event)}/>
        <table className="table">
            <thead>
            <tr>
                <th className="text-center">Image</th>
                <th>Path ({rootDir.name})</th>
                <th className="text-center">Size (MB)</th>
                <th className="text-center">Focal Points</th>
            </tr>
            </thead>
            <tbody>
            {rootDir.items.map((item) => {
                return (
                    <tr key={item.name} onClick={() => {
                        if (!item.directory) {onItemClicked(item)}
                    }}>
                        <td>
                            {item.directory ? "" : <img alt="" className="mx-auto d-block" src={`${Globals.ImageUrl}/${item.name}?width=100`} />}
                        </td>
                        <td>{item.directory ?
                            <span onClick={(event) => onDirectorySelected(item.name)}>{item.name + "/"}</span>
                            : item.name}
                        </td>
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
    </div>
);

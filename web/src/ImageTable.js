import React from 'react';
import Globals from "./Globals";
import UploadImageModal from "./UploadImageModal";

export default ({rootDir, onItemClicked, onUploadImageSubmit}) => (
    <div>
        <button type="button" className="btn btn-primary mb-2" data-toggle="modal" data-target="#uploadImageModal">
            Upload Image
        </button>
        <UploadImageModal onSubmit={(event) => this.onSubmit(event)}/>
        <table className="table">
            <thead>
            <tr>
                <th className="text-center">Image</th>
                <th>Path ({rootDir.name})</th>
                <th className="text-center">Size</th>
                <th className="text-center">Focal Points</th>
            </tr>
            </thead>
            <tbody>
            {rootDir.items.map((item) => {
                return (
                    <tr key={item.name} onClick={() => onItemClicked(item)}>
                        <td>
                            <img alt="" className="mx-auto d-block" src={`${Globals.ImageUrl}/${item.name}?width=100`} />
                        </td>
                        <td>{item.name}</td>
                        <td className="text-center">{item.size}</td>
                        <td className="text-center">
                            {item.focalPoints.map((point, index) => {
                                return (
                                    <span key={item.name + "fp" + index}>{`(${point.x}, ${point.y})`}</span>
                                );
                            })}
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    </div>
);

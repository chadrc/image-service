import React from 'react';
import Globals from "./Globals";

export default ({rootDir}) => (
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
                <tr key={item.name}>
                    <td>
                        <img className="mx-auto d-block" src={`${Globals.ImageUrl}/${item.name}?width=100`} />
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
);

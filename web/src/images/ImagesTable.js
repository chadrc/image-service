import React from 'react';
import Globals from "../Globals";
import {Link} from 'react-router-dom';

const ImagesTable = ({
                         dirInfo,
                         basePath
                     }) => (
    <table className="table">
        <thead>
        <tr>
            <th className="text-center">Image</th>
            <th>Path ({(dirInfo.name || "") + "/"})</th>
            <th className="text-center">Size (MB)</th>
            <th className="text-center">Focal Points</th>
        </tr>
        </thead>
        <tbody>
        {dirInfo.items.map((item) => {
            return (
                <tr key={item.name}>
                    <td>
                        {item.directory ? "" :
                            <img alt="" className="mx-auto d-block"
                                 src={`${Globals.ImageUrl}/${item.path}${item.name}?width=100`}/>}
                    </td>
                    <td>
                        {item.directory ? (
                            <Link to={`${basePath}/${item.path}${item.name}`}>
                                {item.name}/
                            </Link>
                        ) : (
                            <Link to={`${basePath}/${item.path}${item.name}`}>
                                {item.name}
                            </Link>
                        )}
                    </td>
                    <td className="text-center">
                        {item.directory ? "" : (item.size / 1000000).toFixed(2)}
                    </td>
                    <td className="text-center">
                        {!item.directory && item.focalPoints ? item.focalPoints.map((point, index) => {
                            return (
                                <span key={item.name + "fp" + index}>
                                        {`(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`}
                                    </span>
                            );
                        }) : ""}
                    </td>
                </tr>
            );
        })}
        </tbody>
    </table>
);

export default ImagesTable;
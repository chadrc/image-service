import React from 'react';
import {connect} from "react-redux";
import {withRouter, Link} from 'react-router-dom';

const LocationNav = ({
                         breadCrumbs,
                         location,
                         hasUploadHash
                     }) => [
     <section className="d-flex">
         <nav className="breadcrumb">
             {breadCrumbs.map((item, index) => {
                 let last = index === breadCrumbs.length - 1;
                 if (last && !hasUploadHash) {
                     return (
                         <a key={item.path}
                            className="breadcrumb-item active">
                             {item.name}
                         </a>
                     );
                 } else {
                     return (
                         <Link className="breadcrumb-item"
                               key={item.path}
                               to={item.path}>
                             {item.name}
                         </Link>
                     );
                 }
             })}
         </nav>
         <nav className="breadcrumb ml-2">
             {hasUploadHash ? (
                 <Link className="breadcrumb-item"
                       to={location.pathname}>
                     Back
                 </Link>
             ) : (
                 <Link className="breadcrumb-item"
                       to={location.pathname + "#upload"}>
                     Upload
                 </Link>
             )}
         </nav>
     </section>
];

class LocationNavContainer extends React.Component {
    render() {
        let breadCrumbs = [];
        let hasUploadHash = this.props.location.hash === "#upload";
        let parts = this.props.location.pathname.split("/").filter((item) => item.length !== 0);
        let path = "";
        for (let i = 0; i < parts.length; i++) {
            path += "/" + parts[i];
            breadCrumbs.push({
                path: path,
                name: parts[i]
            });
        }
        return <LocationNav {...this.props}
                            hasUploadHash={hasUploadHash}
                            breadCrumbs={breadCrumbs}/>
    }
}

export default withRouter(connect(null, null)(LocationNavContainer));
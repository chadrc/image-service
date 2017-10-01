import React from 'react';
import {connect} from "react-redux";
import {withRouter, Link} from 'react-router-dom';

const LocationNav = ({
                         breadCrumbs
                     }) => (
    <nav className="breadcrumb">
        {breadCrumbs.map((item, index) => {
            let last = index === breadCrumbs.length - 1;
            if (last) {
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
);

class LocationNavContainer extends React.Component {
    render() {
        let breadCrumbs = [];
        let parts = this.props.location.pathname.split("/").filter((item) => item.length !== 0);
        let path = "";
        for (let i = 0; i < parts.length; i++) {
            path += "/" + parts[i];
            breadCrumbs.push({
                path: path,
                name: parts[i]
            });
        }
        return <LocationNav {...this.props} breadCrumbs={breadCrumbs}/>
    }
}

export default withRouter(connect(null, null)(LocationNavContainer));
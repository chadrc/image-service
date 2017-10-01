import React from 'react';
import {Link} from 'react-router-dom';

const Dashboard = () => (
    <nav className="nav">
        <Link className="nav-link" to="/images">Images</Link>
    </nav>
);

export default Dashboard;
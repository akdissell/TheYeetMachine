import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <h2>Home</h2>
                <div style={{ padding: '10px' }}>
                    This is where we enter THE YEET MACHINE
                </div>
                <div style={{ padding: '10px' }}>
                    <Link to={'/input'} className="nav-link">
                        <button>
                            YEET
                        </button>
                    </Link>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
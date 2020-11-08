import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
                SIPEG
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Data Master
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/presensi/all">
                            Presensi
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;

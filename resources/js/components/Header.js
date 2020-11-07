import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
                SIPEG
            </Link>

            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <Link class="nav-link" to="/">
                            Data Master
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/presensi/all">
                            Presensi
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;

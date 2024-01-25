import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn }) {
    return (
        <nav>
            <ul className="navbar-list">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/limos">Limos</Link>
                </li>
                {isLoggedIn ? (
                    <>
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                        <li>
                            <Link to='/edituser'>Edit Profile</Link>
                        </li>
                        <li>
                            <Link to="/booking">Bookings</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
                <li>
                    <Link to="/reviews">Reviews</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

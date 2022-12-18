import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logout(){
    localStorage.removeItem('currentUser')
    window.location.href='/login'
  }
 
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <h3 className="mx-2">ATITHI</h3>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{color: 'white'}}
        >
          <span className="navbar-toggler-icon" ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                   <i className="fa fa-user mx-1" aria-hidden="true"></i>

                    {user.name}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to='/profile'>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/" onClick={logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item ">
                  <a className="nav-link active" href="/register">
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      </nav>
    </div>
  );
}

export default Navbar;

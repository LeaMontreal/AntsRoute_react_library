import { useOktaAuth } from "@okta/okta-react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();

  if (!authState) {
    // return <SpinnerLoading />;
    return <div>Loading ...</div>;
  }

  const handleLogin = async () => history.push("/login");
  const handleLogout = async () => oktaAuth.signOut();

  // myDebugForOkta
  // console.log("authState: ");
  // console.log(authState);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        <span className="navbar-brand">Ants Route</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Search Books
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {/* myDebugForOkta */}
            <li className="nav-item m-1">
              <button className="btn btn-outline-light">Logout</button>
            </li>

            {/* {authState.isAuthenticated ? (
              <li className="nav-item m-1">
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li>
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </li>
            )} */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

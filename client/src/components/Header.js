import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => {
  console.log(props);
  const authUser = props.context.authenticatedUser;
    return (
      <div className="header">
        <div className="bounds">
          <Link to='/'>
            <h1 className="header--logo">Courses</h1>
          </Link>
          <nav>
            {authUser === null ? (
              <React.Fragment>

                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span>Welcome {authUser.firstName}!</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
    );
  }

export default Header;
import React, { Component } from "react";
import { 
  BrowserRouter as Router, 
  Route, 
  Switch } 
from "react-router-dom";

import './styles/App.css';

import Header from "./components/Header";


import Courses from "./components/course_components/Courses";
import CourseDetail from "./components/course_components/CourseDetail";

import UserSignIn from './components/users_components/UserSignIn'
import UserSignUp from './components/users_components/UserSignUp'
import UserSignOut from './components/users_components/UserSignOut'

import withContext from "./Context";

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

class App extends Component {

  render() {
    return(
      <Router>
        <div>
          <HeaderWithContext />

          <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <Route
              exact
              path='/courses/:id'
              render={props => (
                <CourseDetailWithContext
                  {...props}
                  courseId={props.match.params.id}
                />
              )}
            />
            <Route exact path="/signin" component={UserSignInWithContext} />
            <Route exact path="/signout" component={UserSignOutWithContext} />
            <Route exact path="/signup" component={UserSignUpWithContext} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;





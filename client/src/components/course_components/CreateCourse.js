

import React, { Component } from 'react';
import Form from '../Form';

// This component allows authenticated user to create a course 
class createCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatrdTime: '',
    materialsNeeded: '',
    errors: []
  };

  // Method that tracks changes on inputs and updates the state accordingly
  change = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  // On submit, the new course state is updated 
  submit = () => {
    const { context } = this.props;
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    const userId = context.authenticatedUser.id;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };
    //In case there is no title and/or description an error is displayed
    if (title === null && description === null) {
      this.setState({
        errors: ['Please add missing title and/or description']
      });
    } else {
      //In case all the course data are correct, ensure user is authenticated and create the course
      context.data
        .createCourse(course, emailAddress, password)
        .then(errors => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            this.props.history.push('/');
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push('/error');
        });
    }
  };
}

export default createCourse;
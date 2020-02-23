import React, { Component } from 'react';
import Form from '../Form';

// This component allows authenticated user to create a course 
class CreateCourse extends Component {
  state = {
    course: {
      id: '',
      title: '',
      description: '',
      estimatrdTime: '',
      materialsNeeded: ''
    },
    errors: []
  };

  // Method that tracks changes on inputs and updates the state accordingly
  change = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      course: {
        ...this.state.course,
        [name]: value
      }
    });
  };

  // On submit, the new course state is updated 
  submit = async () => {
    const url = `/courses`;
    try {
      const response = await this.props.context.data.api(url, 
                                                        'POST', 
                                                        this.state.course, 
                                                        true, 
                                                        this.props.context.authenticatedUser);

      if (response.status === 201) {
        this.props.history.push("/")
      } else if (response.status === 403) {
        this.props.history.push("/Forbidden");
      } else if (response.status === 400) {
        response.json()
            .then(data =>
                Promise.resolve(this.setState({
                  errors: data.errors
                })));
                
      }
     else if (response.status === 500) {
        this.props.history.push("/error");
      } else {
        throw new Error();
      }
    } catch (error) {
      this.props.history.push("/error");
    }
  };

  // If course creation cancelled, user redirected to home page
  cancel = () => {
    this.props.history.push('/');
  };

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state.course;
    const errors = this.state.errors;
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const courseOwnerName = authUser ? `${authUser.firstName} ${authUser.lastName}` : "No User Signed In"
  
    return(
      <div className='bounds course--detail'>
        <h1>Create Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText='Create Course'
            elements={() => (
              <div>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <React.Fragment>
                      <input id="title"
                        name="title"
                        type="text"
                        className="input-title course--title--input"
                        placeholder="Course title..."
                        value={title}
                        onChange={this.change} />
                    </React.Fragment>
                    <p>By {courseOwnerName}</p>
                    <div className="course--description">
                      <React.Fragment>
                        <textarea id="description"
                          name="description"
                          type="text"
                          placeholder="Course description..."
                          value={description}
                          onChange={this.change} />
                      </React.Fragment>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li key="Estimated Time">
                          <h4>Estimated Time</h4>
                          <div>
                            <React.Fragment>
                              <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                className="course--time--input"
                                placeholder="Hours"
                                value={estimatedTime}
                                onChange={this.change} />
                            </React.Fragment>
                          </div>
                        </li>
                        <li key="Materials">
                          <h4>Materials Needed</h4>
                          <div>
                            <textarea
                              id="materialsNeeded"
                              name="materialsNeeded"
                              placeholder="List materials..."
                              value={materialsNeeded}
                              onChange={this.change}
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )} />
        </div>
      </div>
    );
  }
}

export default CreateCourse;
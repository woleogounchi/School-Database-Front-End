import React, { Component } from 'react';
import Form from '../Form';

class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: null,
    errors: []
  };

  componentDidMount() {
    const { context } = this.props;
    context.data.getCourse(this.props.match.params.id)
      .then(singleCourse => {
        //if the user id is different of the course creator id then user rerouted to '/forbidden' page.
        if (context.authenticatedUser.id !== singleCourse.userId) {
          console.log('userId of course', singleCourse.userId);
          this.props.history.push('/forbidden');
        }
        // If userId doesn't exist user rerouted  to '/notfound'
        else if (singleCourse.userId === null) {
          this.props.history.push('/notfound');
        } else {
          this.setState({
            id: this.props.match.params.id,
            title: singleCourse.title,
            description: singleCourse.description,
            estimatedTime: singleCourse.estimatedTime,
            materialsNeeded: singleCourse.materialsNeeded,
            userId: singleCourse.userId,
            firstName: singleCourse.User.firstName,
            lastName: singleCourse.User.lastName,
            emailAddress: singleCourse.User.emailAddress
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/notfound');
      });
  }

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

  // On submit, course state is updated
  submit = () => {
    const { context } = this.props;
    const signedId = context.authenticatedUser.id;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
      emailAddress,
      id
    } = this.state;
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

    const password = context.authenticatedUser.password;

    if (title === null && description === null) {
      this.setState({
        errors: ['Please add missing title and/or description']
      });
    } else if (userId !== signedId) {
      this.props.history.push(`/forbidden`);
    } else {
      context.data.updateCourse(id, emailAddress, password, course)
        .then(errors => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            this.props.history.push(`/courses/${id}`);
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push('/error');
        });
    }
  };

  // The cancel button redirect to the course detail page
  cancel = () => {
    console.log(this.state);
    this.props.history.push(`/courses/${this.state.id}`);
  };
  
  render() {
    if (this.state) {
      const {
        errors,
        title,
        description,
        estimatedTime,
        materialsNeeded,
        firstName,
        lastName
      } = this.state;

      return (
        <div className='bounds course--detail'>
          <h1>Update course</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText='Update Course'
            elements={() => (
              <React.Fragment>
                <div className='grid-66'>
                  <div className='course--header'>
                    <h4 className='course--label'>Course</h4>
                    <div>
                      <input
                        id='title'
                        name='title'
                        type='text'
                        className='input-title course--title--input'
                        placeholder='Course title...'
                        value={title}
                        onChange={this.change}
                      />
                    </div>
                    <p>
                      By {firstName} {lastName}
                    </p>
                  </div>
                  <div className='course--description'>
                    <div>
                      <textarea
                        id='description'
                        name='description'
                        className=''
                        placeholder='Course description...'
                        value={description}
                        onChange={this.change}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className='grid-25 grid-right'>
                  <div className='course--stats'>
                    <ul className='course--stats--list'>
                      <li className='course--stats--list--item'>
                        <h4>Estimated Time</h4>
                        <div>
                          <input
                            id='estimatedTime'
                            name='estimatedTime'
                            type='text'
                            className='course--time--input'
                            placeholder='Hours'
                            value={estimatedTime}
                            onChange={this.change}
                          />
                        </div>
                      </li>
                      <li className='course--stats--list--item'>
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea
                            id='materialsNeeded'
                            name='materialsNeeded'
                            className=''
                            placeholder='List materials...'
                            value={materialsNeeded}
                            onChange={this.change}
                          ></textarea>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default UpdateCourse; 
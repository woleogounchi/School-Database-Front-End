import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default class CourseDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      course: [],
      user: []
    }
  }

  componentDidMount() {
    const { match } = this.props;
    this.getCourse(match.params.id);
  }

  getCourse = (id) => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then((res) => {
        const course = res.data;
        this.setState({ course });
      })
      .catch(err => {
        if (err) {
            console.log(err);
            const { history } = this.props;
            history.push("/notfound");
        }
    });
  }

handleDelete = (user, id) => {
  const { emailAddress, password } = user;
  axios({
    method: 'delete',
    url: `http://localhost:5000/api/courses/${id}`,
    auth: {
      username: emailAddress,
      password,
    },
  })
    .then(() => {
      const { history } = this.props;
      history.push('/');
    })
    .catch(err => {
      if (err) {
          console.log(err);
          const { history } = this.props;
          history.push("/notfound");
      }
  });
}


  render() {
    return(
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <Link className="button" to={"/courses/" + this.state.course.id + "/update"}>Update Course</Link>
                <Link className="button" to={"/"} onClick={this.handleDelete}>Delete Course</Link>
              </span>
              <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={this.state.course.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown source={this.state.course.materialsNeeded}/>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
    );
  }
}

import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import CourseList from './CourseList';
import { clearError } from '../../actions/errorActions';
import { fetchStart } from '../../actions/fetchActions';
import { deleteCourseStart } from '../../actions/deleteActions';

// ------------------------------------
//  Presentation component
// ------------------------------------

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.addCourseBtn = this.addCourseBtn.bind(this);
    this.props.fetchCourses();
  }

  addCourseBtn() {
    browserHistory.push('/courses/New-Course');
  }

  render() {
    const { courses, deleting, deleteCourse, error, fetching } = this.props;

    // Display loading text if fetching data

    let loading = <p className="LoadingText">Loading...</p>

    if (fetching === false) {
      loading = '';
    }

    // Display error message if there is an error

    let errorMsg = '';

    if (error) {
      errorMsg = <p className="ErrorMessage">{ error }</p>
    }

    // Render - If deleting disable all buttons

    return (
      <div className="ContentBlock">
        <h2>Courses</h2>
        <CourseList
          courses={ courses }
          deleting={ deleting }
          deleteCourse={ deleteCourse }
          />
        { loading }
        { errorMsg }
        <button
          className="Button-Generic"
          disabled={ deleting.processing }
          onClick={ this.addCourseBtn }>
          Add Course
        </button>
      </div>
  )};
}

CoursesPage.propTypes = {
  clearError: React.PropTypes.func.isRequired,
  courses: React.PropTypes.array.isRequired,
  error: React.PropTypes.string.isRequired,
  fetching: React.PropTypes.bool.isRequired,
  fetchCourses: React.PropTypes.func.isRequired,
  deleting: React.PropTypes.object.isRequired,
  deleteCourse: React.PropTypes.func.isRequired,
}

// ------------------------------------
//  Container component
// ------------------------------------

function mapStateToProps(state) {
  return {
    courses: state.fetch.courses,
    deleting: state.deleting,
    error: state.errorMessage,
    fetching: state.fetch.fetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearError: () => { dispatch(clearError()); },
    fetchCourses: () => { dispatch(fetchStart()); },
    deleteCourse: (title) => { dispatch(deleteCourseStart(title)); },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

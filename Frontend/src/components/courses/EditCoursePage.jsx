import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import EditCourseInput from './EditCourseInput';
import { clearError } from '../../actions/errorActions';
import { fetchOneStart } from '../../actions/fetchActions';
import { saveCourseStart } from '../../actions/saveActions';
import utils from '../../../../Utilities/utilities';

// Input fields constants

const fields = {
  title: 'title',
  author: 'author',
  description: 'description',
  tags: 'tags',
};

// Loading text constant

const loadingText = 'Loading...';

// Default values (used when adding a new course)

const defaultCourse = {
  title: 'New Course',
  author: 'Author',
  description: 'This is a new course',
  tags: 'new',
};



// ------------------------------------
//  Presentation component
// ------------------------------------

class EditCoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { courseData: defaultCourse,
                   editing: false,
                   errorStatus: {},
                   fetchError: false,
                   validity: { isValid: true, errorMsg: '' },
                 };
    this.cancelButtonClick = this.cancelButtonClick.bind(this);
    this.saveButtonClick = this.saveButtonClick.bind(this);
    this.initData();
  }


  // ------ Update values and change 'editing' to true when editing ------

  componentWillReceiveProps(nextProps) {
    const { errorMessage, course } = nextProps;

    // Check for errors

    let fetchError = false;

    if (errorMessage && course === {}) {
      fetchError = true;
      this.setState({ fetchError });
    }

    // Update input fields with received data

    if (this.props.course !== course) {
      let newData = {
        title: course.title,
        author: course.author,
        description: course.description,
        tags: course.tags.toString(),
      }

      this.setState({ courseData: newData, originalData: newData, editing: true });
    }
  }



  // ------ Initialize data when editing an existing course -------

  initData() {
    let title = this.props.params.title.split('-').join(' ');

    // If adding a new course do nothing

    if (title === defaultCourse.title) {
      return;
    }

    // Else fetch course data

    this.props.getCourse(title);
  }



  // ------ Cancel Button -------

  cancelButtonClick(evt) {
    evt.preventDefault();

    // Clear error message if any

    this.props.clearError();

    // Send to '/courses' route

    browserHistory.push('/courses');
  }



  // ------ Save Button ------

  saveButtonClick(evt) {
    evt.preventDefault();

    const { courseData, editing, errorStatus, originalData } = this.state;

    // Check for any errors first and let the user know if any

    const errorData = Object.assign({}, errorStatus);
    const errors = Object.keys(errorData);

    if (courseData.title === defaultCourse.title) {
      let errorMsg = 'Please change the default title';

      this.setState({ validity: { isValid: false, errorMsg } });
      return;
    }

    for (let i = 0; i < errors.length; i++) {
      if (errorData[errors[i]]) {
        let errorMsg = 'One or more input fields have errors';

        this.setState({ validity: { isValid: false, errorMsg } });
        return;
      }
    }

    // If editing, verify that at least 1 input field has changed

    if (editing) {
      const fieldTypes = Object.keys(fields);
      let sameValueCount = 0;

      for (let i = 0; i < fieldTypes.length; i++) {
        if (courseData[fieldTypes[i]] === originalData[fieldTypes[i]]) {
          sameValueCount += 1;
        }
      }

      if (sameValueCount === fieldTypes.length) {
        let errorMsg = 'Please change at least one field';

        this.setState({ validity: { isValid: false, errorMsg } })
        return;
      }
    }

    // Set as valid if previous checks have passed

    this.setState({ validity: { isValid: true, errorMsg: '' } });

    // Get input fields data

    const course = Object.assign({}, courseData);

    // Process tags for the backend (convert to array and remove duplicates)

    course.tags = courseData.tags.split(' ');
    course.tags = utils.uniqueArray(course.tags);

    // Retrieve old name for data updating purposes.

    const oldName = this.props.params.title;

    this.props.saveButton(course, editing, oldName);
  }



  // ------ Input control ------

  updateInput(field, evt) {
    let newData = Object.assign({}, this.state.courseData);
    let newErrorData = Object.assign({}, this.state.errorStatus);

    // Update input field

    newData[field] = evt.target.value;

    // Validate input text

    const isValid = utils.isAlphaNumWithSpaces(newData[field]);

    if (isValid) {
      newErrorData[field] = '';
    } else {
      newErrorData[field] = 'Contains one or more invalid characters!';
    }

    if (field === fields.title && newData[field] === defaultCourse.title) {
      newErrorData[field] = 'Can\'t use default name';
    }

    // Set state

    this.setState({ courseData: newData, errorStatus: newErrorData });
  }



  // ------ Render ------

  render(){
    const { saving, fetching, errorMessage } = this.props;
    const { courseData, errorStatus, fetchError, validity } = this.state

    // Disable save button when saving or fetching.

    let saveDisabled = false;

    if (saving || fetching) {
      saveDisabled = true;
    }

    // Disable cancel button only when saving.

    let cancelDisabled = false;

    if (saving) {
      cancelDisabled = true;
    }

    // Change save button text if saving

    let saveBtnText = 'Save';

    if (saving) {
      saveBtnText = 'Saving...';
    }

    // Change input fields text and disable if fetching

    let inputDisabled = false;
    let { title, author, description, tags } = courseData;

    if (fetching || fetchError) {
      inputDisabled = true;

      title = loadingText;
      author = loadingText;
      description = loadingText;
      tags = loadingText;
    }

    // Display errors if any

    let errorMsg = validity.errorMsg

    if (errorMessage) {
      errorMsg = errorMessage;
    }

    // Rendering:
    //  4 Input fields
    //  2 Buttons
    //  Error message

    return (
      <form className="ContentBlock">
        <EditCourseInput
          label="Title"
          isDisabled={ inputDisabled }
          value={ title }
          error={ errorStatus[fields.title] }
          onChange={ this.updateInput.bind(this, fields.title) }
        />
        <EditCourseInput
          label="Author"
          isDisabled={ inputDisabled }
          value={ author }
          error={ errorStatus[fields.author] }
          onChange={ this.updateInput.bind(this, fields.author) }
        />
        <EditCourseInput
          label="Description"
          isDisabled={ inputDisabled }
          value={ description }
          error={ errorStatus[fields.description] }
          onChange={ this.updateInput.bind(this, fields.description) }
        />
        <EditCourseInput
          label="Tags (separate with spaces)"
          isDisabled={ inputDisabled }
          value={ tags }
          error={ errorStatus[fields.tags] }
          onChange={ this.updateInput.bind(this, fields.tags) }
        />
      <p className="ErrorMessage">{ errorMsg }</p>
      <button
        className="Button-Generic"
        disabled={ saveDisabled }
        onClick={ this.saveButtonClick }>
        { saveBtnText }
      </button>
        <button
          className="Button-Generic"
          disabled={ cancelDisabled }
          onClick={ this.cancelButtonClick }>
          Cancel
        </button>
      </form>
  )};
}

EditCoursePage.propTypes = {
  course: React.PropTypes.object,
  clearError: React.PropTypes.func,
  errorMessage: React.PropTypes.string,
  fetching: React.PropTypes.bool,
  getCourse: React.PropTypes.func,
  saving: React.PropTypes.bool,
  saveButton: React.PropTypes.func,
};



// ------------------------------------
//  Container component
// ------------------------------------

function mapStateToProps(state) {
  return {
    course: state.fetch.editCourse,
    errorMessage: state.errorMessage,
    fetching: state.fetch.fetching,
    saving: state.saving,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearError: () => { dispatch(clearError()); },
    getCourse: (title) => { dispatch(fetchOneStart(title)); },
    saveButton: (course, edit, oldName) => { dispatch(saveCourseStart(course, edit, oldName)); },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditCoursePage);

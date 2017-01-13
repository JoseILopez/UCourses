import React from 'react';
import { Link } from 'react-router';

function CourseList(props) {

  // Build course list with data

  const courses = (props.courses.map(course => {

    // Change "Delete" button text when processing the request

    let deleteBtn = 'Delete';

    if (props.deleting[course.title]) {
      deleteBtn = 'Deleting...'
    }

    return (<tr key={ course._id }>
      <td>
        <Link to={ `/courses/${course.title}` }>
          { course.title.split('-').join(' ') }
        </Link>
      </td>
      <td>{ course.author }</td>
      <td>{ course.tags.toString() }</td>
      <td>
        <button
          className="Button-Delete"
          disabled={ props.deleting[course.title] || props.deleting.processing }
          onClick={ props.deleteCourse.bind(null, course.title) }>
          { deleteBtn }
        </button>
      </td>
    </tr>);
  }));

  // Render

  return (
    <table className="CourseTable" cellPadding="5" cellSpacing="5">
      <tbody>
        <tr className="TableHeader">
          <th>Course</th>
          <th>Author</th>
          <th>Tags</th>
        </tr>
        { courses }
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  courses: React.PropTypes.array,
  deleting: React.PropTypes.object,
  deleteCourse: React.PropTypes.func,
};

export default CourseList;

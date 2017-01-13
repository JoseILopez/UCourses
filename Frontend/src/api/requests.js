/*
**    API REQUEST UTILITIES
*/

import API_CONFIG from './config';

// DELETE operation

export function deleteCourse(title) {
  const request = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return fetch(`${API_CONFIG.COURSES}/${title}`, request);
}

// GET by title

export function getCourse(title) {

  // Replace spaces with '-' so it matches the API convention

  const titleParam = title.split(' ').join('-');

  const request = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return fetch(`${API_CONFIG.COURSES}/${titleParam}`, request);
}

// GET ALL

export function getCourses() {
  const request = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return fetch(API_CONFIG.COURSES, request);
}

// PUT or POST

export function saveCourse(course, edit, oldName) {

  // Default to a POST request

  let request = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  };

  let apiURI = API_CONFIG.COURSES;

  // If edit is true, send a PUT instead

  if (edit) {
    request.method = 'PUT';
    apiURI = `${API_CONFIG.COURSES}/${course.title}`;

    // If the name was changed, delete the old entry

    if (oldName !== course.title) {
      deleteCourse(oldName)
      .catch(err => console.log(err));
    }
  }



  return fetch(apiURI, request);
}

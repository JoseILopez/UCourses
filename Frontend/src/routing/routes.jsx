import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from '../App';
import HomePage from '../components/home/HomePage';
import AboutPage from '../components/about/AboutPage';
import CoursesPage from '../components/courses/CoursesPage';
import EditCoursePage from '../components/courses/EditCoursePage';


export default (
    <Route path='/' component={ App }>
      <IndexRoute component={ HomePage } />
      <Route path='about' component={ AboutPage } />
      <Route path='courses' component={ CoursesPage } />
      <Route path='courses/:title' component={ EditCoursePage } />
    </Route>
  );

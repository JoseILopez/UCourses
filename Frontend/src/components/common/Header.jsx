import React from 'react';
import { IndexLink, Link } from 'react-router';

// Header with routing links

function Header(props) {
  return (
    <div className="App-header">
      <h1>UCourses</h1>
      <IndexLink to='/' activeClassName='active'>Home</IndexLink>
      {'   |   '}
      <Link to='/courses' activeClassName='active'>Courses</Link>
      {'   |   '}
      <Link to='/about' activeClassName='active'>About</Link>
    </div>
  );
}

export default Header;

import React from 'react';

const nodeLink = 'https://nodejs.org/en/';
const reactLink ='https://facebook.github.io/react/';
const reduxLink = 'http://redux.js.org/';

function AboutPage(props) {
  return (
    <div className="ContentBlock">
      <h2>About</h2>
      <span>This is a fun test using </span>
      <a href={ nodeLink } rel="noopener" target="_blank">Node.js</a>
      <span>, </span>
      <a href={ reactLink } rel="noopener" target="_blank">React</a>
      <span>, and </span>
      <a href={ reduxLink } rel="noopener" target="_blank">Redux</a>
      <span> with client-side routing and async calls to a server!</span>
      <p/>
    </div>
  );
}

export default AboutPage;

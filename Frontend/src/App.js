import React from 'react';
import './App.css';

import Header from './components/common/Header';

function App(props) {
  return (
    <div className="App">
      <Header />
      <div className="Content">
        { props.children }
      </div>
    </div>
  );
}


export default App;

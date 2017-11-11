import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputPhoneNumber from './InputPhoneNumber';

class App extends Component {
  render() {
    return (
      <div className="App">
        <InputPhoneNumber />
      </div>
    );
  }
}

export default App;

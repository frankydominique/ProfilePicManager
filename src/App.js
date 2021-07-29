import React, { Component } from 'react'
import './App.css';

import PfpCabinet from './components/PfpCabinet';
import AddPfp from './components/AddPfp';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <AddPfp />

        <PfpCabinet />
        
      </div>
    )
  }
}
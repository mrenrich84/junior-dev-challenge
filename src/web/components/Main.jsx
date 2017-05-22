import React from 'react'
import ReactDOM from 'react-dom';
import Navbar from './Navbar'
import Mapp from './Mapp'

const Main = () => (
  <div>
    <Navbar />
    <div id="homePage" className="page">
      <div className="container">
          <Mapp />
      </div>
    </div>
  </div>

)

export default Main

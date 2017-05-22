import React from 'react'
import ReactDOM from 'react-dom';
import Navbar from './Navbar'
import ClientList from './ClientList'

const Main = () => (
  <div>
    <Navbar />
    <div id="homePage" className="page">
      <div className="container">
          <ClientList />
      </div>
    </div>
  </div>

)

export default Main

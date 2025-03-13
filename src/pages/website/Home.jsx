import React from 'react'
import './style.css'

const Home = () => {
  return (
    <div>
        <div id="header-wrap">
    <header id="header">
      <div className="container">
        <div className="inner-content">
          <div className="grid">
            <div className="main-logo">
              <a href="index.html">
                <img src="images/main-logo.png" alt="logo" />
              </a>
            </div>
            <nav id="navbar">
              <div className="main-menu">
                <ul className="menu-list">
                  <li className="menu-item active">
                    <a href="#home" data-effect="Home">
                      Home
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="#about" className="nav-link" data-effect="About">
                      About Us
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="#services"
                      className="nav-link"
                      data-effect="Services"
                    >
                      Works
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="#projects"
                      className="nav-link"
                      data-effect="Projects"
                    >
                      Projects
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="#testimonial"
                      className="nav-link"
                      data-effect="Testimonial"
                    >
                      Testimonial
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="#latest-blog"
                      className="nav-link"
                      data-effect="Latest Blog"
                    >
                      Latest Blog
                    </a>
                  </li>
                  <li className="menu-item ">
                    <a
                      href="https://templatesjungle.gumroad.com/l/creatify-digital-marketing-website-template"
                      className="nav-link"
                    >
                      {" "}
                      <b> GET PRO </b>{" "}
                    </a>
                  </li>
                </ul>
                <div className="hamburger">
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                </div>
              </div>
              <a href="#" className="btn-hvr-effect">
                <span>Let's Talk</span>
                <i className="icon icon-long-arrow-right" />
              </a>
              {/*search-bar*/}
            </nav>
          </div>
        </div>
      </div>
    </header>
  </div>
    </div>
  )
}

export default Home
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

        {/*header-wrap*/}
  <section id="billboard">
    <div className="main-banner pattern-overlay">
      <div className="banner-content" data-aos="fade-up">
        <h2 className="section-subtitle ">top design agency</h2>
        <h3 className="banner-title">
          We are best digital creative agency based in New York, USA.
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
          tincidunt quisque faucibus velit felis tincidunt. Turpis platea sed
          arcu aliquam lorem in. In ut mattis faucibus purus.
        </p>
        <div className="btn-wrap">
          <a href="#" className="btn-accent">
            Contact Us
          </a>
        </div>
      </div>
      {/*banner-content*/}
      <figure>
        <img
          src="images/main-banner.png"
          alt="banner"
          className="banner-image"
        />
      </figure>
    </div>
  </section>
  
  <section id="about">
    <div className="container">
      <div className="row">
        <div className="inner-content">
          <div className="company-detail">
            <div className="grid">
              <figure>
                <img
                  src="images/single-image.jpg"
                  alt="book"
                  className="single-image"
                />
              </figure>
              <div className="detail-entry" data-aos="fade-up">
                <div className="section-header">
                  <h2 className="section-subtitle liner">About Us</h2>
                  <h3 className="section-title">
                    We create beautiful design for good business
                  </h3>
                </div>
                <div className="detail-wrap">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Diam tincidunt quisque faucibus velit felis tincidunt.
                    Turpis platea sed arcu aliquam lorem in. In ut mattis
                    faucibus purus. Donec libero bibendum ut id risus, bibendum
                    faucibus velit mattis diam etiam.
                  </p>
                  <div className="btn-wrap">
                    <a href="#" className="btn-accent">
                      Read More
                    </a>
                  </div>
                </div>
                {/*description*/}
              </div>
            </div>
            {/*grid*/}
          </div>
        </div>
        {/*inner-content*/}
      </div>
    </div>
  </section>
    </div>
  )
}

export default Home
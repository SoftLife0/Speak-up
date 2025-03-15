import React from 'react'
import './style.css'
import speakLogo from '../../assets/images/speaklogo.png'
import banner from '../../assets/images/main-banner.png'
import singleImage from '../../assets/images/single-image.jpg'
import pres from '../../assets/images/telehealth-service.png'
import meds from '../../assets/images/pharmacy.png'
import symp from '../../assets/images/health-assessment.png'
import tips from '../../assets/images/healthy.png'
import remind from '../../assets/images/pills.png'
import consult from '../../assets/images/counseling.png'
import support from '../../assets/images/healthcare.png'

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
                        <img src={speakLogo} alt="logo" />
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
        <h2 className="section-subtitle ">Healthcare at Your Fingertips</h2>
        <h3 className="banner-title">
        One Platform, Endless Health Solutions
        </h3>
        <p>
        With our innovative platform, users can easily share their health concerns with professional pharmacists and receive expert feedback in real-time. Whether it's medication guidance, symptom inquiries, or general health advice, we ensure fast, reliable, and secure interactions.
        
        </p>
        <div className="btn-wrap">
          <a href="#" className="btn-accent">
          Share Your Concern
          </a>
        </div>
      </div>
      {/*banner-content*/}
      <figure>
        <img
          src={banner}
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
                  src={singleImage}
                  alt="book"
                  className="single-image"
                />
              </figure>
              <div className="detail-entry" data-aos="fade-up">
                <div className="section-header">
                  <h2 className="section-subtitle liner">About Us</h2>
                  <h3 className="section-title">
                  Bringing Healthcare Closer
                  </h3>
                </div>
                <div className="detail-wrap">
                  <p>
                  We believe that accessible and reliable healthcare starts with the right connections. That’s why we provide a secure, user-friendly space where individuals can seek expert advice on medications, symptoms, and general health inquiries all from the comfort of their homes.
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

  <section id="services">
    <div className="container">
      <div className="row">
        <div className="inner-content">
          <div className="service-content">
            <div className="grid">
              <div className="detail-entry">
                <div className="section-header">
                  <h2 className="section-subtitle liner">Services</h2>
                  <h3 className="section-title">our abilities for solutions</h3>
                </div>
                <div className="detail-wrap">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Diam tincidunt quisque faucibus velit felis tincidunt.
                    Turpis platea sed arcu aliquam lorem in. In ut mattis
                    faucibus purus donec libero bibendum ut id risus.
                  </p>
                  <div className="btn-wrap">
                    <a href="#" className="btn-accent">
                      View All
                    </a>
                  </div>
                </div>
                {/*detail-wrap*/}
              </div>
              <div className="service-grid grid" data-aos="fade-up">
                <div className="column odd-column">
                  <div className="icon-box">
                    <img src={pres} alt="branding" />
                    <div className="title">Prescription Support</div>
                  </div>
                  <div className="icon-box">
                    <img src={meds} alt="animation" />
                    <div className="title">Treatment Guidance</div>
                  </div>
                </div>
                <div className="column">
                  <div className="icon-box">
                    <img src={symp} alt="branding" />
                    <div className="title">Symptom Assessment</div>
                  </div>
                  <div className="icon-box">
                    <img src={tips} alt="animation" />
                    <div className="title">Wellness Advice</div>
                  </div>
                  <div className="icon-box">
                    <img src={remind} alt="animation" />
                    <div className="title">Medication Reminders</div>
                  </div>
                </div>
                <div className="column odd-column">
                  <div className="icon-box">
                    <img src={consult} alt="branding" />
                    <div className="title">Virtual Consultations </div>
                  </div>
                  <div className="icon-box">
                    <img src={support} alt="branding" />
                    <div className="title">24/7 Health Support </div>
                  </div>
                </div>
              </div>
            </div>
            {/*grid*/}
          </div>
        </div>
        {/*inner-content*/}
      </div>
    </div>
  </section>


  <section id="subscribe">
    <div className="container">
      <div className="row">
        <div className="inner-content">
          <div className="grid">
            <div className="section-header">
              <h2 className="section-subtitle liner">Newsletter</h2>
              <h3 className="section-title">Stay Informed, Stay Healthy! 🩺</h3>
            </div>
            <div className="subscribe-content" data-aos="fade-up">
              <p>
                Subscribe to our newsletter for expert health tips, medication insights, and the latest updates in pharmacy care. Get exclusive access to wellness advice, prescription reminders, and special features—all delivered straight to your inbox!
              </p>
              <form id="form">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email addresss here"
                />
                <button className="btn-subscribe">Subscribe</button>
              </form>
            </div>
          </div>
          {/*grid*/}
        </div>
      </div>
    </div>
  </section>


  <div id="footer-bottom">
    <div className="container">
      <div className="grid">
        <div className="copyright">
          <p>
            © 2025 <a href="#">Mr.Softlife</a>{" "}
          </p>
        </div>
        <div className="social-links">
          <ul>
            <li>
              <a href="#">
                <i className="icon icon-facebook" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="icon icon-twitter" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="icon icon-youtube" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="icon icon-behance-square" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/*grid*/}
    </div>
  </div>
    </div>
  )
}

export default Home
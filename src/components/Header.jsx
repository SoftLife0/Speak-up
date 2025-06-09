import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <nav className="navbar bg-light px-3 position-sticky top-0 w-100" style={{ height: '60px', zIndex: 1020 }}>
      <button className="btn btn-outline-primary d-md-none" onClick={toggleSidebar}>
        ☰
      </button>
      <span className="navbar-brand ms-2">My Dashboard</span>
    </nav>
  );
};

export default Header;

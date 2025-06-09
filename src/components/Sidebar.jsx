import React from 'react';

const Sidebar = ({ show }) => {
  return (
    <div
      className={`bg-dark text-white position-fixed top-0 start-0 h-100 p-3 transition ${
        show ? 'd-block' : 'd-none d-md-block'
      }`}
      style={{ width: '220px', zIndex: 1000 }}
    >
      <h4>Sidebar</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#dashboard">Dashboard</a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#profile">Profile</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

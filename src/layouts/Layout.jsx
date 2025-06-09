import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(prev => !prev);

  return (
    <div className="d-flex flex-column vh-100">
      <Header toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-grow-1" style={{ marginTop: '-60px' }}>
        <Sidebar show={showSidebar} />
        <main
          className="ms-md-5 ms-0 flex-grow-1 p-3 overflow-auto"
          style={{
            marginLeft: '220px',
            height: 'calc(100vh - 60px)',
            marginTop: '60px',
            transition: 'margin-left 0.3s ease',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

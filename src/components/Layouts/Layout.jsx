import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children, headerContent, footerContent }) => {
  return (
    <div>
      <header>
        {/* Include header content */}
        {headerContent}
      </header>
      <main>{children}</main>
      <footer>
        {/* Include footer content */}
        {footerContent}
      </footer>
    </div>
  );
};

export default Layout;

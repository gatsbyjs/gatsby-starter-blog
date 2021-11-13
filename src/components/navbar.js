import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby';
import sun from '../images/sun.svg'
import moon from '../images/moon.svg'

const Navbar = () => {
  let websiteTheme;
  if (typeof window !== `undefined`) {
    websiteTheme = window.__theme;
  }
  useEffect(() => {
    setTheme(window.__theme);
  }, []);

  const [theme, setTheme] = useState(websiteTheme);

  const ThemeToggle = () => {
    window.__setPreferredTheme(websiteTheme === 'dark' ? 'light' : 'dark');
    setTheme(websiteTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="nav-container">
      <div className="brand">
        <Link to="/" className="header-link-home">
          Privacy is Important!
        </Link>
      </div>
      <div className="links">
        <Link to="/" className="header-link-home">
          Home
        </Link>
        <Link to="/" className="header-link-home">
          Project
        </Link>
        <Link to="/" className="header-link-home">
          About
        </Link>
        <div className="cta">
          <button className="dark-switcher" onClick={ThemeToggle}>
            {theme.dark ? (
              <span>
                <img src={sun} className="theme-icon" alt="Light Mode" />
              </span>
            ) : (
              <span>
                <img src={moon} className="theme-icon" alt="Dark Mode" />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
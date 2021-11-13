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
    <nav>
      <div className="nav-container">
          <div className="brand">
            <Link to="/">
              <span className="text">Privacy is Important!</span>
            </Link>
          </div>
          <div className="links">
            <Link to="/" activeClassName="active">
              Home
            </Link>
            <Link to="/" activeClassName="active">
              Project
            </Link>
            <Link to="/" activeClassName="active">
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
    </nav>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
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
          <Link to="/">Privacy</Link>
        </div>
        <div className="links">
          <Link to="/">Blog</Link>
          <Link to="/">Project</Link>
          <Link to="/">About</Link>
          <div className="cta">
            <button className="dark-switcher" onClick={ThemeToggle}>
              {theme === 'dark' ? (
                <img className="theme-icon" src={sun} alt="Light Mode" />
              ) : (
                <img className="theme-icon" src={moon} alt="Dark Mode" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
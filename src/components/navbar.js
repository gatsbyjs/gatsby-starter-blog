import React, { useState, useEffect } from 'react'
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
      <ul>
        <li>
          <a href="/">Privacy</a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">Project</a>
        </li>
        <li>
          <a href="/">About</a>
        </li>
        <li>
          <button onClick={ThemeToggle}>
            {theme === 'dark' ? (
              <span>
                <img src={sun} alt="Light Mode" />
              </span>
            ) : (
              <span>
                <img src={moon} alt="Dark Mode" />
              </span>
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
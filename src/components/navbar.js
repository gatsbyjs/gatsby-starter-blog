import React, { Component } from 'react'
import { Link } from 'gatsby'
import ToggleMode from './togglemode';

export default class Navbar extends Component {
  state = {
    scrolled: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.navOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.navOnScroll);
  }

  navOnScroll = () => {
    if (window.scrollY > 20) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  };

  render() {
    const { scrolled } = this.state;

    return (
      <nav className={scrolled ? 'nav-scroll' : 'nav'}>
        <div className="nav-container">
          <div className="brand">
            <Link to="/">Privacy</Link>
          </div>
          <div className="links">
            <Link to="/">Blog</Link>
            <Link to="/">Project</Link>
            <Link to="/">About</Link>
            <ToggleMode />
            {/* <div className="cta">
              <button className="dark-switcher" onClick={ThemeToggle}>
                {theme === 'dark' ? (
                  <img className="theme-icon" src={sun} alt="Light Mode" />
                ) : (
                  <img className="theme-icon" src={moon} alt="Dark Mode" />
                )}
              </button>
            </div> */}
          </div>
        </div>
      </nav>
    );
  }
}
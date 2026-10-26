import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#home" className="nav-logo">
        <h2>Shravan</h2>
      </a>

      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
        <li>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="nav-resume-btn"
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
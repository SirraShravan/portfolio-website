import React from 'react';

function Hero() {
  return (
    <section className="hero" id="home">
      <h1>Sirra Shravan</h1>

      <p>
        AI & Data Science Student | Full Stack Developer
      </p>

      <div className="hero-links">
        <a
          href="https://github.com/SirraShravan"
          target="_blank"
          rel="noreferrer"
          className="btn-github"
        >
          GitHub
        </a>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="btn-resume"
        >
          View Resume
        </a>

        <a
          href="/resume.pdf"
          download="Sirra_Shravan_Resume.pdf"
          className="btn-download"
        >
          Download CV
        </a>
      </div>
    </section>
  );
}

export default Hero;
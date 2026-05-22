import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero" id="home">
        <div className="left-hero">
            <h1>
            Hi, I'm <span>Rajesh Kumar</span>
            </h1>
            
            <h2>Full Stack Developer</h2>
           
            <p>
            I build responsive and modern web applications using React.js, Node.js
            and MariaDB..
            </p>
            <br />
            <div className="hero-buttons">
            <a href="#projects" className="hero-btn">
                View Projects
            </a>

            <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="hero-btn view-btn"
            >
                View Resume
            </a>

            <a href="/resume.pdf" download className="hero-btn resume-btn">
                Download Resume
            </a>

            <a href="#contact" className="hero-btn contact-btn">
                Contact Me
            </a>
            </div>
        </div>
      <div className="hero-right">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
        />
      </div>
    </section>
  );
}

export default Hero;

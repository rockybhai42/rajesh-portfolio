import "../styles/about.css"
import { useInView } from "../hooks/useInView"

const capabilities = [
    "Business workflow tools",
    "Admin dashboards",
    "Billing & management systems",
    "REST APIs — Node.js / Express",
    "SQL & NoSQL databases"
];

function About () {
    const [ref, isInView] = useInView();

    return(
        <section
          ref={ref}
          className={"about reveal" + (isInView ? " reveal-visible" : "")}
          id="about"
        >
            <div className="about-container">
                <div className="about-text">
                    <h2>About Me</h2>
                    <p>
                  I'm a full-stack web developer focused on building practical,
                database-backed web applications — from business workflow tools
                and admin dashboards to billing and management systems. I work
                across the stack with React on the frontend and Node.js/Express
                on the backend, using SQL and NoSQL databases depending on what
                a project needs.

                I enjoy turning a real business problem into a working
                application, and I'm always learning new tools along the way.
                    </p>
                </div>

                <div className="about-panel">
                    <span className="about-panel-label">What I Build</span>
                    <ul className="about-panel-list">
                        {capabilities.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default About;

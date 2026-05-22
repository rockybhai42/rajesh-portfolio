import "../styles/skills.css";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt
} from "react-icons/fa";

import {
  SiExpress,
  SiMariadb
} from "react-icons/si";

function Skills() {

  const skills = [

    {
      name: "HTML",
      icon: <FaHtml5 />
    },

    {
      name: "CSS",
      icon: <FaCss3Alt />
    },

    {
      name: "JavaScript",
      icon: <FaJs />
    },

    {
      name: "React.js",
      icon: <FaReact />
    },

    {
      name: "Node.js",
      icon: <FaNodeJs />
    },

    {
      name: "Express.js",
      icon: <SiExpress />
    },

    {
      name: "MariaDB",
      icon: <SiMariadb />
    },

    {
      name: "Git",
      icon: <FaGitAlt />
    }

  ];

  return (

    <section className="skills" id="skills">

      <h1>Skills</h1>

      <div className="skills-container">

        {skills.map((skill, index) => (

          <div className="skill-card" key={index}>

            <div className="skill-icon">
              {skill.icon}
            </div>

            <p>{skill.name}</p>

          </div>

        ))}

      </div>

    </section>

  );
}

export default Skills;
import { useState } from "react";
import "../styles/skills.css";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub
} from "react-icons/fa";

import { SiExpress, SiVite, SiMongodb, SiPostgresql, SiVercel, SiRender, SiResend } from "react-icons/si";

const layers = [
  {
    key: "frontend",
    label: "Frontend",
    skills: [
      { name: "JavaScript", icon: <FaJs /> },
      { name: "React", icon: <FaReact /> },
      { name: "Vite", icon: <SiVite /> },
      { name: "HTML", icon: <FaHtml5 /> },
      { name: "CSS", icon: <FaCss3Alt /> }
    ]
  },
  {
    key: "backend",
    label: "Backend / API",
    skills: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express", icon: <SiExpress /> }
    ]
  },
  {
    key: "database",
    label: "Database",
    skills: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> }
    ]
  },
  {
    key: "tools",
    label: "Tools & Services",
    skills: [
      { name: "Git", icon: <FaGitAlt /> },
      { name: "GitHub", icon: <FaGithub /> },
      { name: "Vercel", icon: <SiVercel /> },
      { name: "Render", icon: <SiRender /> },
      { name: "Resend", icon: <SiResend /> }
    ]
  }
];

function Skills() {
  const [activeLayer, setActiveLayer] = useState(null);

  return (
    <section className="skills" id="skills">
      <h2>Skills</h2>
      <p className="skills-subtitle">
        The technology layers behind the applications I build.
      </p>

      <div className="skills-architecture">
        {layers.map((layer) => (
          <div
            key={layer.key}
            className={
              "skills-layer" +
              (activeLayer === layer.key ? " skills-layer-active" : "")
            }
          >
            <span className="skills-layer-label">{layer.label}</span>

            <div className="skills-chip-row">
              {layer.skills.map((skill) => (
                <button
                  type="button"
                  key={skill.name}
                  className="skill-chip"
                  onMouseEnter={() => setActiveLayer(layer.key)}
                  onMouseLeave={() => setActiveLayer(null)}
                  onFocus={() => setActiveLayer(layer.key)}
                  onBlur={() => setActiveLayer(null)}
                >
                  <span className="skill-chip-icon">{skill.icon}</span>
                  {skill.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;

import "../styles/projects.css"


function Projects (){
    const projects = [

    {
      title: "Clinic Billing & Management System",

      category: "Business Application",

      icon: "🏥",

      description:
        "Role-based billing and administration system for small clinics — patient billing with server-computed totals, medicine/injection/fluid inventory, partial payments, and admin-configurable settings, with full audit logging.",

      tech: "React · TypeScript · Node.js · Express · MongoDB",

      github: "https://github.com/rockybhai42/clinic-billing-system",

      live: null,

      note: "Source code sample — GitHub only, not deployed"
    },

    {
      title: "Restaurant Management & Digital Specials System",

      category: "Digital Signage · Media Management",

      icon: "🍽️",

      description:
        "Full-stack restaurant operations app: a manager dashboard for publishing daily specials with image/video uploads, paired with a live customer-facing TV display screen.",

      tech: "React · Node.js · Express · MongoDB · Cloudinary · FFmpeg",

      github: "https://github.com/rockybhai42/today-special-new",

      live: "https://today-special-new.vercel.app",

      extraLink: {
        label: "TV Display",
        url: "https://today-special-new-ghpj.vercel.app"
      }
    },

    {
      title: "PrepPilot — Staff Task & Checklist Manager",

      category: "Workflow Management",

      icon: "✅",

      description:
        "Manager dashboard that turns a business's shift checklist workflow into a web app — shift-based task assignment, completion tracking, and staff notifications.",

      tech: "React · Node.js · Express · MongoDB",

      github: "https://github.com/rockybhai42/preppilot",

      live: "https://preppilot-indol.vercel.app/manager"
    },

    {
      title: "Vendor Management System",

      category: "Business Application",

      icon: "📦",

      description:
        "A full stack vendor and bill management system with image upload, vendor tracking, and bill records.",

      tech: "React.js · Node.js · Express.js · MariaDB",

      github: "https://github.com/rockybhai42/Projects-for-CN",

      live: null
    }

  ];


    return(
       <section className="projects" id="projects">
        <h2>Projects</h2>
        <p className="projects-subtitle">
          Full-stack business applications, not tutorials or clones.
        </p>

         <div className="projects-container">
            {projects.map((project,index)=>(
                <div className="project-card" key={index}>
                    <div className="project-image">
                        {project.image ? (
                            <img src={project.image} alt={project.title} />
                        ) : (
                            <div className="project-image-placeholder">
                                <span>{project.icon || "💻"}</span>
                            </div>
                        )}

                        <span
                          className={
                            "project-status " +
                            (project.live ? "status-live" : "status-source")
                          }
                        >
                          {project.live ? "Live" : "Source Code"}
                        </span>
                    </div>

                    <span className="project-category">{project.category}</span>

                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                    <div className="project-tech-row">
                      {project.tech.split(" · ").map((tech) => (
                        <span className="tech-pill" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.note && <p className="project-note">{project.note}</p>}

                    <div className="project-buttons">
                        <a href={project.github} target="_blank" rel="noreferrer">
                            View Source
                        </a>
                        {project.live && (
                            <a href={project.live} target="_blank" rel="noreferrer">
                                Live Demo
                            </a>
                        )}
                        {project.extraLink && (
                            <a href={project.extraLink.url} target="_blank" rel="noreferrer">
                                {project.extraLink.label}
                            </a>
                        )}
                    </div>

                </div>
            ))}
         </div>
        </section>
    )
}

export default Projects;

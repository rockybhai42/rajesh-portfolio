import "../styles/projects.css"


function Projects (){
    const projects = [

    {
      title: "Vendor Management System",

      image: "/projects/vendor.png",

      description:
        "A full stack vendor and bill management system with image upload, vendor tracking, and bill records.",

      tech: "React.js | Node.js | Express.js | MariaDB",

      github: "https://github.com/",

      live: "https://your-live-demo.com"
    },

    {
      title: "Portfolio Website",

      image: "./projects/portfolio.png",

      description:
        "Personal portfolio website built using React.js with responsive modern UI and animations.",

      tech: "React.js | CSS | React Icons",

      github: "https://github.com/",

      live: "https://your-live-demo.com"
    }

  ];


    return(
       <section className="projects" id="projects">
        <h1 >Projects</h1>

         <div className="projects-container">
            {projects.map((project,index)=>(
                <div className="project-card" key={index}>
                    <div className="project-image">
                        <img src={project.image} alt={project.title} />
                    </div>

                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <h4>{project.tech}</h4>
                    <div className="project-buttons">
                        <a href={project.github} target="_blank" >
                            GitHub
                        </a>
                        <a href={project.live} target="_blank" >
                            Live Demo
                        </a>

                    </div>

                </div>
            ))}
         </div>
        </section>
    )
}

export default Projects;